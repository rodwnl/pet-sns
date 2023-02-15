const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk"); //aws에 접근할 수 있는 권한을 부여하고 활용하기 위한 패키지를 받아옴
aws.config.loadFromPath(__dirname + "/../config/s3Info.json");

const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "pet-sns-firstproject", //bucket이름
    acl: "public-read-write", //권한
    key: (req, file, cb) => {
      cb(null, Date.now() + "." + file.originalname.split(".").pop()); //처음엔 에러값이기에 null넣어주고 해당 파일 이름을 설정해주는 코드 (구분되어야 해서 조금 유니크해야함)
    },
  }),
});

module.exports = upload;
