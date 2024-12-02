import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import Candidate from "../modles/candidateSchema.js";
import { uploadDocuments } from "../utils/uploadToCloudinary.js";

  export const addCandiateSymbol = catchAsyncError(async (req, res, next)=>{
    const file = req.file;
    if(!file) return next(new ErrorHandler('No File Uploaded', 400));
    const result = await uploadDocuments(file.buffer);
    if(!result) return next(new ErrorHandler('Image not Uploaded', 400));
    return res.status(200).json({success: true, message: 'Image uploaded Successfully', Data: result});
  })

export const createCandidate = catchAsyncError(async (req, res, next) => {
  const { candidateAahaarId, candidatename, party, electionSymbol} = req.body;
  if (!(candidateAahaarId || candidatename || party || electionSymbol ))
    return next(
      new ErrorHandler("Please fill the candidatename and Patry Properlly", 400)
    );

  const existingCandidate = await Candidate.findOne({
    aadhaarId: candidateAahaarId,
  });
  if (existingCandidate)
    return next(new ErrorHandler("Candiate also Registerd", 400));

  const newCandidate = new Candidate({
    aadhaarId: candidateAahaarId,
    candidatename,
    party,
    electionSymbol
  });~
  await newCandidate.save();
  return res.status(200).json({ success: true, message: "Candidate Enrolled" });
});

export const updateCandidate = catchAsyncError(async (req, res, next) => {
  const { candidateId } = req.params;
  const { candidatename, party, electionSymbol } = req.body;
  await Candidate.findByIdAndUpdate(
    { _id: candidateId },
    { $set: { candidatename, party, electionSymbol } },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updateCandidate)
    return next(new ErrorHandler("Candiate not Found", 404));

  return res
    .status(200)
    .json({ success: true, message: "Enrolled Candidate Updated" });
});


export const getCandidates = catchAsyncError(async (req, res, next) => {
  const allCandidates = await Candidate.find();
  return res.status(200).json({ success: true, Data: allCandidates });
});

export const deleteCandidate = catchAsyncError(async (req, res, next) => {
  const {candidateId} = req.params;
  const deleteCandidate = await Candidate.findByIdAndDelete({ _id: candidateId });
  if (!deleteCandidate) return next(new ErrorHandler("Candidate Not Found", 404));
  return res.status(200).json({ succes: true, message: "Candidate Deleted" });
});
