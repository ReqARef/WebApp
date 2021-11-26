import amdocsLogo from '../Assets/CompanyLogos/amdocs.png'
import ciscoLogo from '../Assets/CompanyLogos/cisco.png'
import rblLogo from '../Assets/CompanyLogos/rbl.png'
import personIcon from '../Assets/images/person.png'

const authScreenParagraph =
    'This is a random string describing how good the company is and how it will get you a dream job'
const imagePlaceHolder = personIcon
const server = process.env.REACT_APP_SERVER
const companyLogoArray = [
    amdocsLogo,
    ciscoLogo,
    rblLogo,
    amdocsLogo,
    ciscoLogo,
    rblLogo,
    amdocsLogo,
    ciscoLogo,
    rblLogo
]
const aboutUsText = `ReqARef is a dedicated platform for people who are willing to give referrals or want to get referred`

export {
    authScreenParagraph,
    server,
    imagePlaceHolder,
    companyLogoArray,
    aboutUsText
}
