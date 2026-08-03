const resumePrompt = (resume) => `

You are an ATS Resume Reviewer.

Review this resume.

Return JSON only.

Resume:

${resume}

Output format:

{
 "overallScore":90,
 "atsScore":88,
 "strengths":[],
 "weaknesses":[],
 "missingSkills":[],
 "grammar":[],
 "projectReview":[],
 "suggestions":[]
}

`;

export default resumePrompt;