const sendEmail = require("./sendemail");

const notifyAssetAssignment = async (assetID, assignedTo, adminEmails) => {
  const subject = "New Asset Assignment Notification";
  const text = `Asset ${assetID} has been assigned to:
    Name: ${assignedTo.name}
    Employee ID: ${assignedTo.employeeId}
    Email: ${assignedTo.email}
    Date: ${new Date().toDateString()}`;

  console.log("📨 Sending assignment emails to:", adminEmails);

  const results = await Promise.allSettled(
    adminEmails.map((email) => sendEmail(email, subject, text))
  );

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`✅ Email sent to ${adminEmails[i]}`);
    } else {
      console.error(`❌ Failed to send to ${adminEmails[i]}:`, result.reason);
    }
  });
};

const notifyAssetRetrieval = async (assetID, retrievedFrom, adminEmails) => {
  const subject = "Asset Retrieval Notification";
  const text = `Asset ${assetID} has been retrieved from:
      Name: ${retrievedFrom.name}
      Employee ID: ${retrievedFrom.employeeId}
      Email: ${retrievedFrom.email}
      Date: ${new Date().toDateString()}`;

  console.log("📨 Sending retrieval emails to:", adminEmails);

  const results = await Promise.allSettled(
    adminEmails.map((email) => sendEmail(email, subject, text))
  );

  results.forEach((result, i) => {
    if (result.status === "fulfilled") {
      console.log(`✅ Email sent to ${adminEmails[i]}`);
    } else {
      console.error(`❌ Failed to send to ${adminEmails[i]}:`, result.reason);
    }
  });
};

module.exports = {
  notifyAssetAssignment,
  notifyAssetRetrieval,
};
