import PDFDocument from "pdfkit";

const generateResumePDF = (resume, res) => {

  const doc = new PDFDocument({
    margin: 50
  });

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `attachment; filename=resume.pdf`
  );

  doc.pipe(res);

  doc
    .fontSize(24)
    .text(resume.user.name);

  doc.moveDown();

  doc
    .fontSize(14)
    .text(resume.user.email);

  doc.text(resume.phone || "");

  doc.text(resume.address || "");

  doc.moveDown();

  doc
    .fontSize(18)
    .text("Summary");

  doc
    .fontSize(12)
    .text(resume.summary || "");

  doc.moveDown();

  doc
    .fontSize(18)
    .text("Skills");

  resume.skills.forEach(skill => {
    doc.text("• " + skill);
  });

  doc.moveDown();

  doc
    .fontSize(18)
    .text("Education");

  resume.education.forEach(item => {

    doc.text(
      `${item.degree}
${item.college}
${item.year}`
    );

    doc.moveDown();

  });

  doc
    .fontSize(18)
    .text("Experience");

  resume.experience.forEach(item => {

    doc.text(
      `${item.role}
${item.company}
${item.duration}`
    );

    doc.moveDown();

  });

  doc
    .fontSize(18)
    .text("Projects");

  resume.projects.forEach(project => {

    doc.text(project.title);

    doc.text(project.description);

    doc.text(project.github);

    doc.moveDown();

  });

  doc.end();

};

export default generateResumePDF;