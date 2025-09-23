const sendEmail = require("./sendemail");

const notifyAssetAssignment = async (assetID, assignedTo, adminEmails) => {
  const subject = "New Asset Assignment Notification";
  const text = `Asset : ${assetID} has beeen asssigned to : ${assignedTo} at ${new Date().toDateString()} \n. Please take necessary actions and update in the system.`;

  for (const email of adminEmails) {
    await sendEmail(email, subject, text);
  }
};

const notifyAssetRetrieval = async (assetID, retrievedFrom, adminEmails) => {
  const subject = "Asset Retrieval Notification";
  const text = `Asset  : ${assetID} has been retrieved from : ${retrievedFrom} at ${new Date().toDateString()} \n. Please take necessary actions and update in the system.`;

  for (const email in adminEmails) {
    await sendEmail(email, subject, text);
  }
};

module.exports = {
  notifyAssetAssignment,
  notifyAssetRetrieval,
};
