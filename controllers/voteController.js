import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/error.js";
import Candidate from "../modles/candidateSchema.js";
import Voter from "../modles/voterSchema.js";
import Vote from "../modles/voteSchema.js";

export const createVote = catchAsyncError(async (req, res, next) => {
  const { candidateId } = req.params;
  const { userId } = req.params;
  if (!candidateId)
    return next(new ErrorHandler("Candidate Not Enrolled", 400));
  const voterId = await Voter.findOne({ userId: userId });
  if (!voterId)
    return next(new ErrorHandler("You have not access to give Vote", 400));
  if (voterId?.hasVoted) return next(new ErrorHandler("You already Voted", 400));
  await Vote.create({
    voterId: voterId._id,
    candidateId,
  });

  const updatedCandidate = await Candidate.findByIdAndUpdate(
    { _id: candidateId },
    { $inc: { votes: 1 } },
    { new: true, runValidators: true }
  );

  const updateVoter = await Voter.findByIdAndUpdate(
    { _id: voterId._id },
    { $set: { hasVoted: true } },
    { new: true, runValidators: true }
  );
  return res
    .status(200)
    .json({ success: true, message: "Vote Successfully Done." });
});
