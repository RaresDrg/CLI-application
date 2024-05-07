import * as contactsService from "./contacts.js";
import AVAILABLE_COMANDS_LIST from "./utils.js";

import { randomUUID } from "crypto";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv;

const invokeAction = ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      contactsService.getContactsList();
      break;

    case "get":
      id?.length > 0
        ? contactsService.getContactById(id)
        : console.log(
            "You must enter the id of the contact you are looking for. For example: --id 9526384asf"
              .red
          );
      break;

    case "add":
      const hasAllArguments = name && email && phone;

      if (!hasAllArguments) {
        console.log(
          `For adding a contact you must enter it's name, email and phone. For example: --name "Dan Smith" --email: "dan.smith@yahoo.com", --phone: "(070) 598-5792".`
            .red
        );
        return;
      }

      const newContact = { id: randomUUID(), name, email, phone };
      contactsService.addContact(newContact);
      break;

    case "remove":
      id?.length > 0
        ? contactsService.removeContact(id)
        : console.log(
            "You must enter the id of the contact you want to remove. For example: --id 9526384asf"
              .red
          );
      break;

    default:
      console.log(`This command is not supported.`.red);
      console.log(`Here is the list of all available commands:`.yellow);
      console.table(AVAILABLE_COMANDS_LIST);
  }
};

invokeAction(argv);
