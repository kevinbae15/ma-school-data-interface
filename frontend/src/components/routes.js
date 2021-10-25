/***************************************

Will add routing as well as proper 
navbar links. 

If you want to add a new page, just add 
here and it will get automatically
recognized

Set nav_name to false if you do not 
want it as a tab on nav bar

***************************************/

import Home from './Home/Home'

export const ROUTES = {
  home: {
    path: '/',
    component: Home,
  },
}
