import path from "path";
import fs from "fs";
import express from "express";
import { saveGuests } from "../services/guests";
const router = express.Router();

router.route("/save-guest").post(async (req, res, next) => {
  try {
    const saveRequest = JSON.parse(JSON.stringify(req.body));
    const data = await saveGuests(saveRequest);
    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error
    });
  }
});

// router.route("/cincy-timelapse").get((req, res) => {
//   const _path = path.join(__dirname, "../ui/static/timelapse.mp4");
//   var stat = fs.statSync(_path);
//   var total = stat.size;
//   if (req.headers["range"]) {
//     var range = req.headers.range;
//     var parts = range.replace(/bytes=/, "").split("-");
//     var partialstart = parts[0];
//     var partialend = parts[1];

//     var start = parseInt(partialstart, 10);
//     var end = partialend ? parseInt(partialend, 10) : total - 1;
//     var chunksize = end - start + 1;

//     // var file = fs.createReadStream(_path, { start: start, end: end });
//     var file = fs
//       .createReadStream(_path, { start: start, end: end })
//       .on("open", () => {
//         res.writeHead(206, {
//           "Content-Range": "bytes " + start + "-" + end + "/" + total,
//           "Accept-Ranges": "bytes",
//           "Content-Length": chunksize,
//           "Content-Type": "video/mp4"
//         });
//         file.pipe(res);
//       })
//       .on("error", err => {
//         console.log("error: ", err);
//         res.end(err);
//       });
//   } else {
//     res.writeHead(200, {
//       "Content-Length": total,
//       "Content-Type": "video/mp4"
//     });
//     fs.createReadStream(_path).pipe(res);
//   }

//   // /res.status(200).json({ success: true, data: timelapse });
// });

export default router;
