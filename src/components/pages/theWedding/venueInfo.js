import photos from "../../../constants/photos";
import routes from "../../../constants/routes";
import { venueIds } from "../../../constants/routes";
const veunueInfo = {
  "st-louis": {
    id: "st-louis",
    title: "St. Louis Church",
    fullTitle: "St. Louis Catholic Church",
    time: "4:45 pm",
    address: "29 E 8th St, Cincinnati, OH 45202",
    description: `Lorem ipsum dolor sit amet, sed movet altera te, qui officiis quaerendum te, ei nibh duis mei. His no quando consequuntur, est ipsum mundi eu. Hinc vero usu ei, eius nusquam erroribus nec no, eos labitur sententiae adversarium in. Case cibo impetus mel id, et eum postea repudiare.

    Quas periculis ut est. Meis admodum explicari eam eu, veniam consequuntur eam ei. Eu vim omnis munere, soluta hendrerit democritum mel id. An ridens causae cetero his, no duis invenire nec, pro ex duis solum. Deleniti perpetua vim at, debet ubique omittantur at vim.
    
    Recusabo mediocrem qui ut, adolescens adipiscing liberavisse at quo, vix ne ocurreret pertinacia. Deleniti sententiae no qui, nostrum voluptatum eam at. Sit prima consulatu cu, te diam unum soleat sea, per an commodo perpetua vulputate. Eam te perfecto sadipscing concludaturque. An sed augue utroque. Quem alia vivendo eos in, virtute instructior pro cu, usu iusto molestie in.`,
    image: photos.stLouis,
    to: `${routes.Venue}/${venueIds.ceremony}`
  },
  "cincinnati-club": {
    id: "cincinnati-club",
    title: "The Cincinnati Club",
    time: "6:00 pm",
    address: "4300, 30 Garfield Pl, Cincinnati, OH 45202",
    description: `Lorem ipsum dolor sit amet, sed movet altera te, qui officiis quaerendum te, ei nibh duis mei. His no quando consequuntur, est ipsum mundi eu. Hinc vero usu ei, eius nusquam erroribus nec no, eos labitur sententiae adversarium in. Case cibo impetus mel id, et eum postea repudiare.

    Quas periculis ut est. Meis admodum explicari eam eu, veniam consequuntur eam ei. Eu vim omnis munere, soluta hendrerit democritum mel id. An ridens causae cetero his, no duis invenire nec, pro ex duis solum. Deleniti perpetua vim at, debet ubique omittantur at vim.
    
    Recusabo mediocrem qui ut, adolescens adipiscing liberavisse at quo, vix ne ocurreret pertinacia. Deleniti sententiae no qui, nostrum voluptatum eam at. Sit prima consulatu cu, te diam unum soleat sea, per an commodo perpetua vulputate. Eam te perfecto sadipscing concludaturque. An sed augue utroque. Quem alia vivendo eos in, virtute instructior pro cu, usu iusto molestie in.`,
    image: photos.cincinnatiClub,
    to: `${routes.Venue}/${venueIds.reception}`
  }
};

const ceremony = veunueInfo["st-louis"];
const reception = veunueInfo["cincinnati-club"];

export default veunueInfo;
export { ceremony, reception };
