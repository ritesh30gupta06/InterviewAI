import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdDescription,
  MdAnalytics
} from "react-icons/md";

import { FaRobot } from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar(){

const location=useLocation();

const menu=[
{
name:"Dashboard",
icon:<MdDashboard/>,
path:"/dashboard"
},
{
name:"Resume",
icon:<MdDescription/>,
path:"/resume"
},
{
name:"Interview",
icon:<FaRobot/>,
path:"/interview"
},
{
name:"Analytics",
icon:<MdAnalytics/>,
path:"/analytics"
}
];

return(

<div className="sidebar">

<h2>PrepPilot AI</h2>

<nav>

{

menu.map(item=>(

<Link

key={item.path}

to={item.path}

className={
location.pathname===item.path
?
"active"
:
""
}

>

{item.icon}

<span>

{item.name}

</span>

</Link>

))

}

</nav>

</div>

);

}