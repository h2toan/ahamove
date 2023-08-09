import Express from "express";
import BodyParser from "body-parser";
import axios from "axios";

const Server = new Express();
Server.use(BodyParser.urlencoded({ extended: false }));

Server.post("/", (req, res) => {
  let { phone, name, email, company, so_luong_xe } = req.query;
  sendToAimkt(phone, name, email, company, so_luong_xe);
  res.status(200).send();
});

Server.listen(80, () => {
  console.log("Listening at port 80");
});

function sendToAimkt(phone, name, email, company, so_luong_xe) {
  let data = JSON.stringify({
    Data: [
      {
        phoneNumber: phone,
        lastName: name,
        email: email,
        companyName: company,
        so_luong_xe_can_quan_ly_e9z09j6j_1691553637539: +so_luong_xe,
      },
    ],
    UpdateType: 2,
    ContactListStatics: null,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://open.ladizone.com/v2/api/contact/import",
    headers: {
      "x-api-key":
        " 7tn5B2s6sJftkDPnOfXlfDU4tbDdr/eNl1HMko+/FeHlNyqGkljRqfQ0p1FgPh35nkMA99JUebhNnpegGGMn695a9m3UQWJKPd7ZJ69xb5slrmxtnzguKeHiPZYZy/2P",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
}
