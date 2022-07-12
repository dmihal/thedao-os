import * as icons from "../icons";
import google1999 from "./textFiles/google1999";
import facepalm from "./textFiles/facepalm";
import squirtel from "./textFiles/squirtel";
import rollin from "./textFiles/rollin";
import sunscreen from "./textFiles/sunscreen";
import allStarTabs from "./textFiles/allStarTabs";

const accessories = [
  { title: "Entertainment", icon: icons.folderProgram16.src, options: [] },
  { title: "Internet Tools", icon: icons.folderProgram16.src, options: [] },
  { title: "System Tools", icon: icons.folderProgram16.src, options: [] },
  { title: "Calculator", icon: icons.calculator16.src, isDisabled: true },
  {
    title: "Minesweeper",
    icon: icons.minesweeper16.src,
    component: "Minesweeper",
    multiInstance: true
  },
  {
    title: "Notepad",
    icon: icons.notepad16.src,
    component: "Notepad",
    multiInstance: true
  },
  {
    title: "Paint",
    icon: icons.paint16.src,
    component: "IframeWindow",
    data: { src: "https://jspaint.app/", creator: "https://github.com/1j01" },
    multiInstance: true
  },
  {
    title: "SkiFree",
    icon: icons.skifree.src,
    component: "IframeWindow",
    data: {
      src: "https://basicallydan.github.io/skifree.js/"
    },
    multiInstance: true
  }
];

const programs = [
  { title: "Accessories", icon: icons.folderProgram16.src, options: accessories },
  { title: "Online Services", icon: icons.folderProgram16.src, options: [] },
  { title: "StartUp", icon: icons.folderProgram16.src, options: [] },
  {
    title: "IE4(BROKEN)",
    icon: icons.internetExplorere16.src,
    component: "InternetExplorer",
    data: { __html: google1999 }
  },
  {
    title: "JS-DOS Prompt",
    icon: icons.msDos16.src,
    component: "JSDos",
    multiInstance: true
  },
  { title: "Outlook Express", icon: icons.outlook16.src, isDisabled: true },
  { title: "Windows Explorer", icon: icons.windowsExplorer16.src, isDisabled: true }
];

const favorites = [
  {
    title: "Channels",
    options: [],
    icon: icons.folder16.src
  },
  {
    title: "Links",
    icon: icons.folder16.src,
    options: [
      {
        title: "MySpace",
        type: "ExternalLink",
        icon: icons.htmlFile16.src,
        href:
          "https://web.archive.org/web/20080320075546/www.myspace.com/my_address"
      }
    ]
  },
  {
    title: "Media",
    icon: icons.folder16.src,
    options: [
      {
        title: "My Big List of Films",
        type: "ExternalLink",
        icon: icons.htmlFile16.src,
        href: "https://letterboxd.com/padraig"
      }
    ]
  },
  {
    title: "My Github",
    type: "ExternalLink",
    icon: icons.htmlFile16.src,
    href: "https://github.com/padraigfl"
  }
];

export const find = [
  { title: "Files or Folders...", icon: icons.findFiles16.src, isDisabled: true },
  {
    title: "Computer...",
    icon: icons.findComputer16.src,
    isDisabled: true
  },
  {
    title: "On the Internet...",
    icon: icons.findOnline16.src,
    type: "ExternalLink",
    href: "https://google.com"
  },
  {
    title: "People...",
    icon: icons.findPeople16.src,
    type: "ExternalLink",
    href: "https://facebook.com"
  }
];

export default [
  {
    title: "Programs",
    icon: icons.folderProgram24.src,
    options: programs
  },
  {
    title: "Favorites",
    icon: icons.folderFavorites24.src,
    options: favorites,
  },
  {
    title: "Documents",
    icon: icons.folderOpen24.src,
    options: [
      {
        title: "ASCII Art",
        options: [
          {
            title: "facepalm",
            icon: icons.notepadFile32.src,
            component: "Notepad",
            data: {
              content: facepalm
            }
          },
          {
            title: "squirtel",
            icon: icons.notepadFile32.src,
            component: "Notepad",
            data: {
              content: squirtel
            }
          }
        ],
        icon: icons.folder16.src
      },
      {
        title: "Lyrics",
        options: [
          {
            title: "sunscreen",
            icon: icons.notepadFile32.src,
            component: "Notepad",
            data: {
              content: sunscreen
            }
          },
          {
            title: "all star lyrics",
            icon: icons.notepadFile32.src,
            component: "Notepad",
            data: {
              content: allStarTabs
            }
          }
        ],
        icon: icons.folder16.src
      },
      {
        title: "Guitar Tabs",
        options: [
          {
            title: "rollin guitar tabs",
            icon: icons.notepadFile32.src,
            component: "Notepad",
            data: {
              content: rollin
            }
          },
          {
            title: "all star",
            icon: icons.notepadFile32.src,
            component: "Notepad",
            data: {
              content: allStarTabs
            }
          }
        ],
        icon: icons.folder16.src
      }
    ]
  }
];
