import fs from "fs/promises";
import path from "path";
import "colors";

const contactsPath = path.resolve("./db/contacts.json");

const getContactsList = async () => {
  console.log("Pending: get contacts list...".yellow);

  try {
    const fileContent = await fs.readFile(contactsPath, "utf8");
    const contactsList = JSON.parse(fileContent);

    if (contactsList.length === 0) {
      throw new Error("There is no contacts saved.");
    }

    console.log(
      "Operation successfully completed! Here is your contacts list:".green
    );
    console.table(contactsList);
  } catch (error) {
    console.log(`Operation failed. ${error}`.red);
  }
};

const getContactById = async (contactId) => {
  console.log("Pending: get a specific contact...".yellow);

  try {
    const contactsList = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const specificContact = contactsList.find((item) => item.id === contactId);

    if (!specificContact) {
      throw new Error("The contact you are looking for does not exist.");
    }

    console.log(
      "Operation successfully completed! Here is the contact you are looking for:"
        .green
    );
    console.table([{ ...specificContact }]);
  } catch (error) {
    console.log(`Operation failed. ${error}`.red);
  }
};

const removeContact = async (contactId) => {
  console.log("Pending: remove a contact...".yellow);

  try {
    const contactsList = JSON.parse(await fs.readFile(contactsPath, "utf8"));

    const indexOfContactForRemove = contactsList.findIndex(
      (item) => item.id === contactId
    );

    if (indexOfContactForRemove === -1) {
      throw new Error("The contact does't exist in the database.");
    }

    contactsList.splice(indexOfContactForRemove, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));

    console.log(
      "Operation successfully completed: contact has been removed !".green
    );
  } catch (error) {
    console.log(`Operation failed. ${error}`.red);
  }
};

const addContact = async (contact) => {
  console.log("Pending: add a contact...".yellow);

  try {
    const contactsList = JSON.parse(await fs.readFile(contactsPath, "utf8"));

    if (
      contactsList.find(
        (item) =>
          item.name === contact.name &&
          item.email === contact.email &&
          item.phone === contact.phone
      )
    ) {
      throw new Error("The contact already exists in the database");
    }

    contactsList.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));

    console.log(
      "Operation successfully completed: contact has been added !".green
    );
  } catch (error) {
    console.log(`Operation failed. ${error}`.red);
  }
};

export { getContactsList, getContactById, removeContact, addContact };
