import BrushIcon from '@material-ui/icons/Brush';
import BallotIcon from '@material-ui/icons/Ballot';
import CreateIcon from '@material-ui/icons/Create';
import PublicIcon from '@material-ui/icons/Public';
import SchoolIcon from '@material-ui/icons/School';
import { SvgIconTypeMap } from '@material-ui/core';
import HeadsetIcon from '@material-ui/icons/Headset';
import PaletteIcon from '@material-ui/icons/Palette';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import CategoryIcon from '@material-ui/icons/Category';
import LanguageIcon from '@material-ui/icons/Language';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import FunctionsIcon from '@material-ui/icons/Functions';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

export interface SubjectIcon {
  id: string;
  name: string;
  icon: OverridableComponent<SvgIconTypeMap>;
}

export const subjectIcons = [
  {
    id: '0fef5acb-6d2e-4bbc-9b5e-ea0a468ec35f',
    name: 'Book',
    icon: MenuBookIcon,
  },
  {
    id: 'c9adb6f1-f832-4186-a7db-40cc2cd8706c',
    name: 'Music Note',
    icon: MusicNoteIcon,
  },
  {
    id: 'f4918888-bd77-4224-aeef-e1362a5def31',
    name: 'Palette',
    icon: PaletteIcon,
  },
  {
    id: 'a7e1d8f6-5b51-4d13-b248-ff4d588d32bd',
    name: 'Math',
    icon: FunctionsIcon,
  },
  {
    id: '3dc6e0a9-6b7b-43dd-a908-c50af059256a',
    name: 'Headphones',
    icon: HeadsetIcon,
  },
  {
    id: '93efa857-716c-4d5e-bea2-e8c9d975c5d2',
    name: 'Color Lens',
    icon: ColorLensIcon,
  },
  {
    id: '90a8d06c-856d-451f-b3aa-ee7a082f411b',
    name: 'Brush',
    icon: BrushIcon,
  },
  {
    id: '22e80509-e890-404f-8073-3157743b1aef',
    name: 'Create',
    icon: CreateIcon,
  },
  {
    id: 'ed6af741-1c47-4855-bfc1-72eb3b64f97c',
    name: 'Folder',
    icon: CreateNewFolderIcon,
  },
  {
    id: 'aabc91fd-ee60-44b8-b819-2558ea912b7c',
    name: 'Language',
    icon: LanguageIcon,
  },
  {
    id: '8a430ccf-919a-4e37-bc88-f615ed071b7b',
    name: 'School',
    icon: SchoolIcon,
  },
  {
    id: 'f59d38f6-a819-4e7f-9acf-28a4ad8c43a0',
    name: 'Public',
    icon: PublicIcon,
  },
  {
    id: '29e6a024-0895-45c5-a4fd-5abf85278ea7',
    name: 'Object',
    icon: EmojiObjectsIcon,
  },
  {
    id: 'c70785c7-582a-412b-824f-bddc819209ef',
    name: 'Emotion',
    icon: EmojiEmotionsIcon,
  },
  {
    id: '541e5314-39ae-40e0-86ab-11262a056e54',
    name: 'Ballot',
    icon: BallotIcon,
  },
  {
    id: '81005136-6656-484c-8024-c432ec359848',
    name: 'Football',
    icon: SportsFootballIcon,
  },
  {
    id: '040276eb-c336-40b4-9814-d9db3f0a9468',
    name: 'Beach',
    icon: BeachAccessIcon,
  },
  {
    id: '13eff8b1-84df-4551-810d-acdd8a261861',
    name: 'Category',
    icon: CategoryIcon,
  },
];
