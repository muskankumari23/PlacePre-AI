export const getStudentDashboard = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Student Dashboard Data",

      dashboard: {
        user: {
          id: req.user._id,
          name: req.user.name,
          email: req.user.email,
          role: req.user.role,
        },

        stats: {
          resumeCompletion: 20,
          dsaSolved: 0,
          quizzesCompleted: 0,
          appliedJobs: 0,
          interviewsScheduled: 0,
        },
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};