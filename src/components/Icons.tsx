// Re-export all Material Design Icons from @mui/icons-material
// This file serves as a central place to import icons from

import React from 'react';

// Navigation & Menu
export { Menu as MenuIcon } from '@mui/icons-material';
export { Add as AddIcon } from '@mui/icons-material';
export { Search as SearchIcon } from '@mui/icons-material';
export { Phone as PhoneIcon } from '@mui/icons-material';
export { ExpandMore as ChevronDownIcon } from '@mui/icons-material';
export { ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';
export { ArrowDropDown as ArrowDropDownIcon } from '@mui/icons-material';

// Pagination
export { FirstPage as FirstPageIcon } from '@mui/icons-material';
export { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
export { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
export { LastPage as LastPageIcon } from '@mui/icons-material';

// Filters & Actions
export { FilterList as FilterSortIcon } from '@mui/icons-material';
export { ViewModule as ViewCardIcon } from '@mui/icons-material';

// Custom Orders/Package Icon
export const OrdersIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M11.25 19.569V12.4305L4.99997 8.81125V15.7766C4.99997 15.8279 5.0128 15.876 5.03845 15.9209C5.06408 15.9658 5.10254 16.0042 5.15383 16.0363L11.25 19.569ZM12.75 19.569L18.8461 16.0363C18.8974 16.0042 18.9359 15.9658 18.9615 15.9209C18.9872 15.876 19 15.8279 19 15.7766V8.81125L12.75 12.4305V19.569ZM11.0961 21.2055L4.40385 17.3536C4.11923 17.1895 3.89744 16.9702 3.73847 16.6959C3.57949 16.4215 3.5 16.1202 3.5 15.792V8.20743C3.5 7.87923 3.57949 7.57795 3.73847 7.3036C3.89744 7.02924 4.11923 6.81 4.40385 6.6459L11.0961 2.794C11.3807 2.6299 11.682 2.54785 12 2.54785C12.3179 2.54785 12.6192 2.6299 12.9038 2.794L19.5961 6.6459C19.8807 6.81 20.1025 7.02924 20.2615 7.3036C20.4205 7.57795 20.5 7.87923 20.5 8.20743V15.792C20.5 16.1202 20.4205 16.4215 20.2615 16.6959C20.1025 16.9702 19.8807 17.1895 19.5961 17.3536L12.9038 21.2055C12.6192 21.3696 12.3179 21.4516 12 21.4516C11.682 21.4516 11.3807 21.3696 11.0961 21.2055ZM15.8557 8.89975L18.175 7.56898L12.1538 4.08628C12.1025 4.05423 12.0513 4.0382 12 4.0382C11.9487 4.0382 11.8974 4.05423 11.8461 4.08628L9.67495 5.33628L15.8557 8.89975ZM12 11.1382L14.325 9.79205L8.14998 6.2228L5.82495 7.56898L12 11.1382Z" fill="currentColor" fillOpacity="0.87"/>
  </svg>
);

// You can add more icons as needed from @mui/icons-material
// Full list available at: https://mui.com/material-ui/material-icons/
