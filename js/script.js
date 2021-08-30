let tableObj = [];
createForm();
createTable();

document.forms[0].onsubmit = () => {
  updateTableLS();
  updateTable();
  document.querySelector(".popup").classList.toggle("inactive");
  return false;
};

const food = document.forms[0]["food"];
food.addEventListener("input", () => {
  if (food.selectedOptions.length < 2) {
    food.setCustomValidity("Select atlease 2 items");
  } else {
    food.setCustomValidity("");
  }
});
const pincode = document.querySelector("#pincode");
pincode.addEventListener("input", () => {
  pincode.setCustomValidity("");
  pincode.checkValidity();
});
pincode.addEventListener("invalid", () => {
  if (pincode.value === "") {
    pincode.setCustomValidity("Enter the pincode");
  } else {
    pincode.setCustomValidity("Enter only number");
  }
});

function createForm() {
  const formContainer = document.querySelector(".popup");
  formContainer.innerHTML = `
  <div class="container">
  <form id="add-user" class="grid">
    <input
      type="text"
      name="first name"
      id="first-name"
      placeholder="First Name"
      required
    />
    <input
      type="text"
      name="last name"
      id="last-name"
      placeholder="Last Name"
      required
    />
    <select
      class="span-two"
      name="gender"
      id="gender"
      placeholder="gender"
      required
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
    <input
      type="text"
      name="address"
      id="address"
      placeholder="Address"
      required
    />
    <input
      type="text"
      name="pincode"
      id="pincode"
      pattern="[0-9]+"
      placeholder="Pincode"
      required
    />
    <select
      onchange="print_state('state',this.selectedIndex)"
      id="country"
      name="country"
      required
    >
      <option value="">select country</option>
    </select>
    <select
      name="state"
      id="state"
      style="visibility: hidden"
      required
    ></select>
    <select
      class="span-two"
      name="food"
      id="food"
      multiple
      size="5"
      required
    >
      <optgroup label="Select choice of food">
        <option value="Briyani">Briyani</option>
        <option value="Fried Rice">Fried Rice</option>
        <option value="Noodles">Noodles</option>
        <option value="Starters">Starters</option>
        <option value="South Indian Dishes">South Indian Dishes</option>
        <option value="North Indian Dishes">North Indian Dishes</option>
        <option value="Breads">Breads</option>
      </optgroup>
    </select>
    <div>
      <button type="reset">Reset</button>
      <button type="submit" name="submit" id="submit">Submit</button>
    </div>
  </form>
</div>
<button class="close" onclick="showAddForm()">&times;</button>`;

  print_country("country");
}

function createTable() {
  tableObj = JSON.parse(window.localStorage.getItem("table")) || [];
  document.querySelector(".table-container").innerHTML = ` <table class="table">
  <thead class="table-striped">
    <tr id="row-heading">
      <th id="index">#</th>
      <th id="first-name">First Name</th>
      <th id="last-name">Last Name</th>
      <th id="gender">Gender</th>
      <th id="address">Address</th>
      <th id="pincode">Pincode</th>
      <th id="country">Country</th>
      <th id="state">State</th>
      <th id="food">Food Choice</th>
    </tr>
  </thead>
  <tbody id="table-content"></tbody>
  </table>`;
  updateTable();
}

function updateTable() {
  const table = document.querySelector("#table-content");
  const headRow = document.querySelector("#row-heading");
  table.innerHTML = "";
  tableObj.forEach((tr) => {
    const trow = document.createElement("tr");
    for (let ele of headRow.children) {
      trow.innerHTML += `<td>${tr[ele.id]}</td>`;
    }
    table.append(trow);
  });
}

function updateTableLS() {
  try {
    const trObj = {};
    index = window.localStorage.getItem("index") || 1;
    trObj["index"] = index;
    const form = document.querySelector("#add-user");
    for (let element of form) {
      let key = element.id;
      if (element.type === "submit" || element.type === "reset") {
        continue;
      }
      if (key === "food") {
        continue;
      }
      trObj[key] = element.value;
    }
    let foodchoice = [];
    for (let food of form["food"].selectedOptions) {
      foodchoice.push(food.label);
    }
    trObj["food"] = foodchoice.join();
    tableObj.push(trObj);
    window.localStorage.setItem("table", JSON.stringify(tableObj));
    window.localStorage.setItem("index", ++index);
  } catch (err) {
    console.log(err);
  }
}

print_country("country");

function print_country(country_id) {
  var option_str = document.getElementById(country_id);
  option_str.length = 0;
  option_str.options[0] = new Option("Select Country", "");
  option_str.selectedIndex = 0;
  for (var i = 0; i < country_arr.length; i++) {
    option_str.options[option_str.length] = new Option(
      country_arr[i],
      country_arr[i]
    );
  }
}

function print_state(state_id, state_index) {
  document.querySelector("#state").style = "visibility: visible";
  var option_str = document.getElementById(state_id);
  option_str.length = 0;
  option_str.options[0] = new Option("Select State", "");
  option_str.selectedIndex = 0;
  var state_arr = s_a[state_index].split("|");
  for (var i = 0; i < state_arr.length; i++) {
    option_str.options[option_str.length] = new Option(
      state_arr[i],
      state_arr[i]
    );
  }
}

function showAddForm() {
  document.querySelector(".popup").classList.toggle("inactive");
  document.querySelector("#add-user").reset();
}

function clearTable() {
  if (tableObj.length === 0) {
    window.alert("There is no items in the table!!!");
    return;
  }
  if (window.confirm("Are you sure?")) {
    document.querySelector("#table-content").innerHTML = "";
    tableObj = [];
    window.localStorage.setItem("table", "[]");
    window.localStorage.setItem("index", "");
  }
}
