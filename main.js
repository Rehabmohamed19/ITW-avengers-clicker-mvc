// MODEL

let data = [
  {
    imgSrc: "avenger.jpg",
    name: "av1",
    count: 0,
  },
  {
    imgSrc: "avengers2.jpg",
    name: "av2",
    count: 0,
  },
  {
    imgSrc: "avengers3.jpg",
    name: "av3",
    count: 0,
  },
]



// VIEW
class AddressBookView {
  init() {
    this.renderContactListModule();
    this.renderContactDetailsModule(0);
    this.addContactModule();
  }
  renderContactListModule() {
    //get all contacts and assign to contacts 
    const contacts = addressBookApp.getContacts();
    // cache #contact-list DOM 
    const contactListUI = document.getElementById('contact-list');
    // clear HTML from the DOM 
    contactListUI.innerHTML = '';
    for (let i = 0, len = contacts.length; i < len; i++) {
      let li = document.createElement('li');
      li.setAttribute('class', 'contact-list-item');
      li.setAttribute('data-index', i);
      let img = document.createElement('img');
      li.append(img);
      li.style.listStyleType = "none"
      img.src = `${contacts[i].imgSrc}`;
      img.style.width = "100px"
      img.style.height = "100px"
      li.addEventListener("click", this.renderContactListModule);
      img.addEventListener("click", this.renderContactListModule);
      contactListUI.append(li);
    }
  }

  renderContactDetailsModule(e) {
    let selectedIndex = null;
    if (typeof e === 'object') {
      e.stopPropagation();
      selectedIndex = this.getAttribute('data-index')
    } else {
      selectedIndex = e;
    }
    const selectedItem = addressBookApp.getContact(selectedIndex);
    const ContactItemUI = document.getElementById("admin-form");

    ContactItemUI.innerHTML = `
    <div class="input-group mb-3">
                    <input type="text" class="form-control name-holder" value="${selectedItem['name']}" placeholder="Name" aria-label="Name"
                        aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3">
                    <input type="url" class="form-control url-holder" value="${selectedItem['imgSrc']}" placeholder="Url" aria-label="Url"
                        aria-describedby="basic-addon1">
                </div>
                <div class="input-group mb-3">
                    <input type="number" class="form-control count-holder" value="${selectedItem['count']}" placeholder="Count" aria-label="Count"
                        aria-describedby="basic-addon1">
                </div>
                <button type="submit" class="btn btn-success save">Save</button>
                <button class="btn btn-danger cansel">Cansel</button>
    `;
    for (let i = 0; i < selectedItem.length; i++) {
      const currentImg = document.querySelector(".add-contact-input");
      currentImg.src = selectedItem.imgSrc;
    }
  }

  hightlightCurrentListItem(selectedIndex) {
    const ContactListItems = document.getElementsByClassName('contact-list-item');
    for (let i = 0; i < ContactListItems.length; i++) {
      ContactListItems[i].classList.remove('active');
    }
    ContactListItems[selectedIndex].classList.add("active")
  }

  addContactModule() {
    const addContact = document.getElementById('add-contact-btn');
    addContact.addEventListener("click", this.addContactBtnClicked.bind(this));
  }

  addContactBtnClicked() {
    // get the add contact form inputs 
    const addContactInputs = document.getElementsByClassName('add-contact-input');
    // this object will hold the new contact information
    let newContact = {};
    // loop through View to get the data for the model 
    for (let i = 0, len = addContactInputs.length; i < len; i++) {
      let key = addContactInputs[i].getAttribute('data-key');
      let value = addContactInputs[i].value;
      newContact[key] = value;
    }
    // passing new object to the addContact method 
    addressBookApp.addContact(newContact);
    // render the contact list with the new data set
    this.renderContactListModule();
  }


}

const addressBookView = new AddressBookView();


// CONTROLLER
class AddressBookCtrl {
  constructor(addressBookView) {
    this.addressBookView = addressBookView;
  }
  init() {
    this.addressBookView.init();
  }
  getContacts() {
    return data;
  }
  getContact(index) {
    return data[index];
  }
  addContact(contact) {
    data.push(contact);
  }
}


const addressBookApp = new AddressBookCtrl(addressBookView);

addressBookApp.init();
