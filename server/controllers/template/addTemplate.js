const Template = require("../../model/Template");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const crypto = require("crypto");
const sharp = require("sharp");

const bucketName = process.env.TEMPLATE_BUCKET_NAME;
const bucketRegion = process.env.TEMPLATE_BUCKET_REGION;
const accessKey = process.env.S3_ACCESS_KEY;
const secretKey = process.env.S3_SECRET_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
  region: bucketRegion,
});

const AddTemplate = async (req, res) => {
  const { data, parameters } = req.body;
  const img = req.files[0];
  const { id } = req.query;

  if (!data || !parameters || !img) {
    return res.status(400).json({ message: "Invalid template" });
  }

  // const parsedData = await JSON.parse(data);
  // const parsedImg = await JSON.parse(img);
  
  const fileName = crypto.randomBytes(12).toString("hex");
  const buffer = await sharp(img.buffer).png({ quality: 50 }).toBuffer();
  try {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: buffer,
      ContentType: img.mimetype,
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);
    
    const parsedParams = await JSON.parse(parameters);
    const newTemplate = {
      data: data,
      img: fileName,
      orgId: id,
      parameters:parsedParams
    };
    console.log(newTemplate);
    await Template.create(newTemplate);
    return res.status(200).json({ message: "Saved to your collection" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = AddTemplate;
