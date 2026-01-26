# Material Design Icons Reference

This project now uses **@mui/icons-material** which provides access to all 2,000+ Google Material Design icons.

## 📦 Installation

Already installed:
```bash
npm install @mui/icons-material @mui/material @emotion/react @emotion/styled
```

## 🎯 How to Use

### Method 1: Import from Icons.tsx (Recommended for consistency)
```tsx
import { MenuIcon, SearchIcon, AddIcon } from './components/Icons';

// Use in JSX with design token for color
<MenuIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
```

### Method 2: Import directly from @mui/icons-material
```tsx
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';

// Use in JSX
<HomeIcon />
<DeleteIcon style={{ color: 'red' }} />
<SettingsIcon fontSize="large" />
```

## 🎨 Icon Styling Options

Material UI icons support multiple styling approaches:

### 1. Style Prop with Design Token (Recommended - Current Standard)
```tsx
// Always use the design token for icon color
<SearchIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
<MenuIcon style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
```

**IMPORTANT**: All icons should use `color: 'var(--color-content-high-emphasis)'` for consistency across the design system.

### 2. fontSize Prop (Recommended for responsive sizing)
```tsx
<SearchIcon fontSize="small" />   // 20px
<SearchIcon fontSize="medium" />  // 24px (default)
<SearchIcon fontSize="large" />   // 35px
<SearchIcon fontSize="inherit" /> // inherit from parent
```

### 3. Color Prop
```tsx
<SearchIcon color="primary" />
<SearchIcon color="secondary" />
<SearchIcon color="action" />
<SearchIcon color="disabled" />
<SearchIcon color="error" />
```

### 4. Combining Props
```tsx
<SearchIcon fontSize="large" color="primary" />
<DeleteIcon fontSize="small" style={{ color: 'red' }} />
```

## 📚 Currently Available Icons (in Icons.tsx)

### Navigation & Menu
- `MenuIcon` - Hamburger menu
- `AddIcon` - Plus/Add symbol
- `SearchIcon` - Magnifying glass
- `ChevronDownIcon` - Dropdown arrow
- `ArrowDownwardIcon` - Sort arrow
- `ArrowDropDownIcon` - Dropdown indicator

### Communication
- `PhoneIcon` - Phone symbol

### Pagination
- `FirstPageIcon` - Jump to first page
- `ChevronLeftIcon` - Previous page
- `ChevronRightIcon` - Next page
- `LastPageIcon` - Jump to last page

### Filters & Views
- `FilterSortIcon` - Filter/sort list
- `ViewCardIcon` - Card view toggle

## 🔍 Finding More Icons

### Browse All Icons Online:
🌐 **Official Material Icons Gallery**: https://mui.com/material-ui/material-icons/

### Commonly Used Icons by Category:

#### **Action Icons**
```tsx
import {
  Add, Remove, Delete, Edit, Save, Cancel,
  Check, Close, Done, Clear, Settings,
  Refresh, MoreVert, MoreHoriz, Star,
  Favorite, Share, Print, Download, Upload
} from '@mui/icons-material';
```

#### **Navigation Icons**
```tsx
import {
  Home, Menu, ArrowBack, ArrowForward,
  ChevronLeft, ChevronRight, ExpandMore, ExpandLess,
  UnfoldMore, UnfoldLess, FirstPage, LastPage
} from '@mui/icons-material';
```

#### **Communication Icons**
```tsx
import {
  Phone, Email, Message, Chat, Send,
  Notifications, NotificationsActive, NotificationsOff,
  Call, CallEnd, Voicemail
} from '@mui/icons-material';
```

#### **Content Icons**
```tsx
import {
  ContentCopy, ContentCut, ContentPaste,
  FilterList, Sort, Create, Add, Remove,
  Link, AttachFile, Cloud, Flag, Archive
} from '@mui/icons-material';
```

#### **Editor Icons**
```tsx
import {
  FormatBold, FormatItalic, FormatUnderlined,
  FormatAlignLeft, FormatAlignCenter, FormatAlignRight,
  AttachFile, InsertLink, FormatQuote
} from '@mui/icons-material';
```

#### **File Icons**
```tsx
import {
  Folder, FolderOpen, InsertDriveFile,
  CloudUpload, CloudDownload, Attachment,
  Description, PictureAsPdf
} from '@mui/icons-material';
```

#### **Hardware Icons**
```tsx
import {
  Computer, Phone, Tablet, Watch,
  Keyboard, Mouse, Print, Scanner
} from '@mui/icons-material';
```

#### **Image Icons**
```tsx
import {
  Image, PhotoCamera, Collections,
  Brightness1, Brightness2, Brightness3,
  Panorama, Photo, PhotoLibrary
} from '@mui/icons-material';
```

#### **Social Icons**
```tsx
import {
  People, Person, PersonAdd, Group,
  Share, ThumbUp, ThumbDown, Public
} from '@mui/icons-material';
```

#### **Toggle Icons**
```tsx
import {
  CheckBox, CheckBoxOutlineBlank,
  RadioButtonChecked, RadioButtonUnchecked,
  ToggleOn, ToggleOff, Star, StarBorder,
  Visibility, VisibilityOff
} from '@mui/icons-material';
```

#### **Alert & Status Icons**
```tsx
import {
  Error, ErrorOutline, Warning, WarningAmber,
  Info, InfoOutlined, CheckCircle, Cancel,
  Help, HelpOutline, ReportProblem
} from '@mui/icons-material';
```

#### **Maps & Places Icons**
```tsx
import {
  Place, LocationOn, Map, MyLocation,
  Navigation, Directions, LocalShipping
} from '@mui/icons-material';
```

## 💡 Usage Examples

### Header Actions
```tsx
import { Menu, Notifications, AccountCircle } from '@mui/icons-material';

<Menu style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
<Notifications style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
<AccountCircle style={{ width: '32px', height: '32px', color: 'var(--color-content-high-emphasis)' }} />
```

### Table Actions
```tsx
import { Edit, Delete, Visibility, FilterList } from '@mui/icons-material';

<Edit style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)', cursor: 'pointer' }} />
<Delete style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
<Visibility style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
<FilterList style={{ width: '24px', height: '24px', color: 'var(--color-content-high-emphasis)' }} />
```

### Form Controls
```tsx
import { Save, Cancel, Send, AttachFile } from '@mui/icons-material';

<button>
  <Save style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
  Save
</button>
<button>
  <Cancel style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
  Cancel
</button>
<Send style={{ width: '18px', height: '18px', color: 'var(--primary-color-primary-main)' }} />
<AttachFile style={{ width: '18px', height: '18px', color: 'var(--color-content-high-emphasis)' }} />
```

## 🚀 Adding New Icons to Icons.tsx

When you need a new icon:

1. Find it at: https://mui.com/material-ui/material-icons/
2. Add to `src/components/Icons.tsx`:
```tsx
export { IconName as CustomName } from '@mui/icons-material';
```
3. Import and use:
```tsx
import { CustomName } from './Icons';
```

## 📖 Official Documentation

- **Material Icons Gallery**: https://mui.com/material-ui/material-icons/
- **MUI Icons API**: https://mui.com/material-ui/api/icon/
- **Google Material Design**: https://m3.material.io/styles/icons/overview
