
function loadFromLocalStorage() {
  const stored = localStorage.getItem("cvData");
  if (stored) {
    try {
      Object.assign(cvData, JSON.parse(stored));
    } catch (e) {
      console.error("Invalid data in localStorage");
    }
  }
}
function saveToLocalStorage() {
  localStorage.setItem("cvData", JSON.stringify(cvData));
  alert("Data saved successfully!");
}
const cvData = {
  profile: {
    name: "Jamal Akhmedov",
    title: "Developer",
    summary: "My name is Jamal Akhmedov, and I’m a passionate and dedicated software developer with a strong interest in creating efficient, scalable, and user-friendly applications. I specialize in [your main programming languages or technologies – e.g., JavaScript, Python, C#, etc.] and have experience working on both front-end and back-end development. With a problem-solving mindset and a continuous drive to learn new technologies, I enjoy building solutions that make a real impact. I have worked on various projects ranging from web and mobile applications to automation tools and database systems. I value clean code, teamwork, and lifelong learning. Whether I'm collaborating with a team or working independently, I always aim to deliver high-quality and reliable software. In my free time, I enjoy exploring new frameworks, contributing to open-source projects, and staying up to date with the latest trends in the tech industry."
  },
  contact: {
    phone: "Phone Number: +994 50 341 43 65",
    email: "Mail: jamalakhmeov@gmail.com",
    livelocation: "Live location: Azerbaijan, Sumgait",
    website: "Site: www.developerjamal.com"
  },
  education: [],
  skills: [],
  languages: [],
  work: [],
  references: []
};


function renderCV() {
  document.getElementById('name').innerHTML = `<strong>${cvData.profile.name.split(' ')[0]}</strong> <span>${cvData.profile.name.split(' ')[1]}</span>`;
  document.getElementById('title').textContent = cvData.profile.title;
  document.getElementById('summary').textContent = cvData.profile.summary;

  document.getElementById('phone').textContent = cvData.contact.phone;
  document.getElementById('email').textContent = cvData.contact.email;

  const educationList = document.getElementById('educationList');
  educationList.innerHTML = '';
  cvData.education.forEach((edu, index) => {
    const div = document.createElement('p');
    div.innerHTML = `<strong>${edu.year}</strong><br>${edu.school}<br>${edu.field}`;
    div.onclick = () => editEducation(index);
    educationList.appendChild(div);
  });

  const skillsList = document.getElementById('skillsList');
  skillsList.innerHTML = '';
  cvData.skills.forEach((skill, index) => {
    const li = document.createElement('li');
    li.textContent = skill;
    li.onclick = () => editSkill(index);
    skillsList.appendChild(li);
  });

  const languagesList = document.getElementById('languagesList');
  languagesList.innerHTML = '';
  cvData.languages.forEach(lang => {
    const li = document.createElement('li');
    li.textContent = lang;
    languagesList.appendChild(li);
  });

  const workList = document.getElementById('workList');
  workList.innerHTML = '';
  cvData.work.forEach((work, index) => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `<p>${work.description}</p>`;
    div.onclick = () => editWork(index);
    workList.appendChild(div);
  });

  const referenceList = document.getElementById('referenceList');
  referenceList.innerHTML = '';
  cvData.references.forEach((ref, index) => {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${ref.name}</strong><br>${ref.title}<br>${ref.email}`;
    div.onclick = () => editReference(index);
    referenceList.appendChild(div);
  });
}

function toggleSection(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
}


function addEducation() {
  const year = prompt("Enter the years (e.g., 2030–2034):");
  const school = prompt("Enter the school name:");
  const field = prompt("Enter your field of study:");

  if (!year || !school || !field) return alert("All fields are required.");
  if (year.length > 30 || school.length > 50 || field.length > 50) return alert("Character limits exceeded.");

  cvData.education.push({ year, school, field });
  renderCV();
}

function addSkill() {
  const skill = prompt("Enter a new skill:");
  if (!skill) return alert("Skill cannot be empty.");
  if (skill.length > 50) return alert("Skill too long.");
  cvData.skills.push(skill);
  renderCV();
}

function addWork() {
  const work = prompt("Describe your work experience:");
  if (!work) return alert("Work experience cannot be empty.");
  if (work.length > 250) return alert("Description too long.");
  cvData.work.push({ description: work });
  renderCV();
}

function addLanguage() {
  const language = prompt("Enter a language and proficiency");
  if (!language) return alert("Language is required.");
  if (language.length > 50) return alert("Too long.");
  cvData.languages.push(language);
  renderCV();
}

function addReference() {
  const name = prompt("Enter reference name:");
  const title = prompt("Enter reference title:");
  const email = prompt("Enter reference email:");

  if (!name || !title || !email) return alert("All fields are required.");
  if (!validateEmail(email)) return alert("Invalid email format.");
  if (name.length > 50 || title.length > 50) return alert("Too long.");

  cvData.references.push({ name, title, email });
  renderCV();
}

function editEducation(index) {
  const year = prompt("Edit years:", cvData.education[index].year);
  const school = prompt("Edit school:", cvData.education[index].school);
  const field = prompt("Edit field:", cvData.education[index].field);
  if (!year || !school || !field) return alert("All fields are required.");
  cvData.education[index] = { year, school, field };
  renderCV();
}

function editSkill(index) {
  const skill = prompt("Edit skill:", cvData.skills[index]);
  if (!skill) return alert("Skill cannot be empty.");
  cvData.skills[index] = skill;
  renderCV();
}

function editWork(index) {
  const description = prompt("Edit work experience:", cvData.work[index].description);
  if (!description) return alert("Description cannot be empty.");
  cvData.work[index].description = description;
  renderCV();
}

function editReference(index) {
  const name = prompt("Edit reference name:", cvData.references[index].name);
  const title = prompt("Edit reference title:", cvData.references[index].title);
  const email = prompt("Edit reference email:", cvData.references[index].email);

  if (!name || !title || !email) return alert("All fields are required.");
  if (!validateEmail(email)) return alert("Invalid email format.");

  cvData.references[index] = { name, title, email };
  renderCV();
}

document.addEventListener('DOMContentLoaded', () => {
  loadFromLocalStorage();
  renderCV();
});
