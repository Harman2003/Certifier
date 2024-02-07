const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const sharp = require("sharp");

const bucketName = process.env.EVENT_BUCKET_NAME;
const bucketRegion = process.env.EVENT_BUCKET_REGION;
const accessKey = process.env.S3_ACCESS_KEY;
const secretKey = process.env.S3_SECRET_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  region: bucketRegion,
});

const uploadImg = async (req, res) => {
  //restrict file sizes & also fix - what if user keeps on pushing images without creating events
  if (!req.file) {
    return res.status(400).json({message:'Image not received'});
  }
  try {
    const buffer = await sharp(req.file.buffer).jpeg({ quality: 50 }).toBuffer();
    const fileName = crypto.randomBytes(12).toString("hex");
    
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    return res.status(200).json({key:fileName});
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = uploadImg;
