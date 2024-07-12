import "./Header.css"
import shi1 from "../assets/insta.png"
import shi2 from "../assets/twitter.png"
import shi3 from "../assets/yt.png"
const Header = () =>{

  return(
    <div className="header text-slate-12 text-sm flex justify-between gap1 align-center">
      <div className="logo font-medium">WeLand</div>
      <div className="hNav text-slate-11 flex gap2 font-medium">
        <div>Vision</div>
        <div>Features</div>
        <div>Team</div>
        <div>Updates</div>
      </div>
      <div className="flex gap1">
        <div className="hImgBar flex gap1 align-center">
          <div className="imgBox"><img src={shi1} alt="" /></div>
          <div className="imgBox"><img src={shi2} alt="" /></div>
          <div className="imgBox"><img src={shi3} alt="" /></div>
        </div>
        <div className="explore text-sm1">Register</div>
      </div>
    </div>
  )
}

export default Header