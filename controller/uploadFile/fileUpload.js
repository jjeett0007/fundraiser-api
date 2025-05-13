const cloudinary = require("../../lib/cloudinary");

const getResourceType = (fileExtension) => {
  const documentFormats = ["pdf", "doc", "docx", "xls", "xlsx", "csv", "txt"];
  const imageFormats = ["jpg", "jpeg", "png", "gif", "bmp", "tiff"];
  const audioFormats = ["mp3", "webm", "wav", "aac", "flac", "ogg", "mpeg"];
  const videoFormats = ["mp4", "avi", "mov", "wmv", "flv", "mkv"];

  if (documentFormats.includes(fileExtension)) return "raw";
  if (imageFormats.includes(fileExtension)) return "image";
  if (
    audioFormats.includes(fileExtension) ||
    videoFormats.includes(fileExtension)
  )
    return "video";

  return "auto";
};

const getFormat = (fileExtension) => {
  return fileExtension === "mpeg" ? "mp3" : fileExtension;
};

const uploadFile = catchAsync(async (req, res) => {
  const { file } = req.body;

  if (!file) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .send({ message: "No file provided" });
  }

  const fileExtension = file.split(";")[0].split("/")[1];

  const extension = getResourceType(fileExtension)
  console.log(extension)

  const uploadOptions = {
    folder: "uploads",
    use_filename: true,
    unique_filename: false,
    resource_type: getResourceType(fileExtension),
    format: getFormat(fileExtension)
  };

  try {
    const cloudinaryUpload = await cloudinary.uploader.upload(
      file,
      uploadOptions
    );

    handleResponse(
      res,
      (code = 200),
      (message = "File uploaded successfully"),
      (data = {
        link: cloudinaryUpload.secure_url,
        type: getFormat(fileExtension)
      })
    );
  } catch (error) {
    console.error(error);
    return res.status(statusCodeMap[500]).send({
      message: "Internal Server Error, Contact Dev team"
    });
  }
});

module.exports = uploadFile;
