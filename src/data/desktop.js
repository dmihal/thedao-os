import * as icons from "../icons";
import resume from "./textFiles/resume";
import readme from "./textFiles/readme";

export default [
  {
    title: "Welcome",
    icon: icons.computer32.src,
    component: "Welcome",
    data: {},
  },
  {
    title: "Analytics",
    icon: icons.computer32.src,
    component: "Analytics",
    data: {},
  },
  {
    title: "My Computer",
    icon: icons.computer32.src,
    component: "ExplorerWindow",
    data: {
      content: [
        {
          title: "(C:)",
          icon: "cd32",
          failState: {
            message:
              "This is a React App, there is no CD drive, your laptop probably doesn't have one either",
            loadTime: 4000
          }
        },
        {
          title: "(D:)",
          icon: "hdd32",
          failState: {
            message: "This is a React App, there is no hard drive",
            loadTime: 1000
          }
        },
        {
          title: "3 1/2 Floppy (A:)",
          icon: "floppy32",
          failState: {
            message:
              "Did everyone else's computer take ages to load the 'no floppy disc inserted' message or was that just mine?",
            loadTime: 8000
          }
        }
      ]
    }
  },
  {
    title: "README",
    icon: icons.htmlFile32.src,
    component: "InternetExplorer",
    data: {
      __html: readme
    }
  },
  {
    title: "Resume draft 31 final last 2019 may final 1",
    icon: icons.notepadFile32.src,
    component: "Notepad",
    data: {
      content: resume,
      readOnly: true
    }
  }
];
