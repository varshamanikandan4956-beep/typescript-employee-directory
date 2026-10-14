
interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  muid?: string;
}

type SearchField = "name" | "role" | "department" | "email";

const employees: Employee[] = [
  {
    id: 1,
    name: "Varsha N",
    role: "Student Developer",
    department: "Web Development",
    email: "varshan@mulearn",
    muid: "varshan@mulearn"
  },
  {
    id: 2,
    name: "Anu Krishnan",
    role: "Frontend Developer",
    department: "Engineering",
    email: "anu@example.com"
  },
  {
    id: 3,
    name: "Rahul Menon",
    role: "Backend Developer",
    department: "Engineering",
    email: "rahul@example.com"
  },
  {
    id: 4,
    name: "Meera Nair",
    role: "UI/UX Designer",
    department: "Design",
    email: "meera@example.com"
  },
  {
    id: 5,
    name: "Arjun Das",
    role: "Data Analyst",
    department: "Analytics",
    email: "arjun@example.com"
  },
  {
    id: 6,
    name: "Neha Thomas",
    role: "Project Manager",
    department: "Operations",
    email: "neha@example.com"
  }
];

const employeeList = document.getElementById("employeeList");
const searchInput = document.getElementById(
  "searchInput"
) as HTMLInputElement | null;
const employeeCount = document.getElementById("employeeCount");

function createEmployeeCard(employee: Employee): HTMLElement {
  const card = document.createElement("article");
  card.className = "employee-card";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = employee.name
    .split(" ")
    .map((part: string) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const name = document.createElement("h3");
  name.textContent = employee.name;

  const role = document.createElement("p");
  role.className = "role";
  role.textContent = employee.role;

  const department = document.createElement("p");
  department.className = "department";
  department.textContent = `Department: ${employee.department}`;

  const email = document.createElement("a");
  email.className = "email";
  email.textContent = employee.email;

  // Only create a mail link for actual email addresses.
  if (employee.email.includes("@") &&
      employee.email.includes(".") &&
      !employee.email.endsWith("@mulearn")) {
    email.href = `mailto:${employee.email}`;
  }

  card.append(avatar, name, role, department, email);

  if (employee.muid) {
    const muid = document.createElement("p");
    muid.className = "email";
    muid.textContent = `μID: ${employee.muid}`;
    card.appendChild(muid);
  }

  return card;
}

function renderEmployees(list: Employee[]): void {
  if (!employeeList || !employeeCount) return;

  employeeList.replaceChildren();
  employeeCount.textContent =
    `${list.length} employee${list.length === 1 ? "" : "s"} found`;

  if (list.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No employees found. Try another search.";
    employeeList.appendChild(empty);
    return;
  }

  list.forEach((employee: Employee) => {
    employeeList.appendChild(createEmployeeCard(employee));
  });
}

function searchEmployees(
  query: string,
  fields: SearchField[] = ["name", "role", "department", "email"]
): Employee[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return employees;

  return employees.filter((employee: Employee) =>
    fields.some((field: SearchField) =>
      employee[field].toLowerCase().includes(normalizedQuery)
    )
  );
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    renderEmployees(searchEmployees(searchInput.value));
  });
}

renderEmployees(employees);

