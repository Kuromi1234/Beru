const sendEmail = require("./sendemail");

const notifyAssetAssignment = async (assetID, assignedTo, adminEmails) => {
  const subject = "New Asset Assignment Notification";
  const text = `Asset ${assetID} has been assigned to:
      Name: ${assignedTo.name}
      Employee ID: ${assignedTo.employeeId}
      Email: ${assignedTo.email}
      Date: ${new Date().toDateString()}`;

  for (const email of adminEmails) {
    await sendEmail(email, subject, text);
  }
};

const notifyAssetRetrieval = async (assetID, retrievedFrom, adminEmails) => {
  const subject = "Asset Retrieval Notification";
  const text = `Asset ${assetID} has been retrieved from:
      Name: ${retrievedFrom.name}
      Employee ID: ${retrievedFrom.employeeId}
      Email: ${retrievedFrom.email}
      Date: ${new Date().toDateString()}`;

  for (const email of adminEmails) {
    await sendEmail(email, subject, text);
  }
};

module.exports = {
  notifyAssetAssignment,
  notifyAssetRetrieval,
};
