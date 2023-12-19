const Event = require("../../model/Event.js");
const User = require("../../model/User.js");

const getEvents = async (req, res) => {
  const { id, search, type, lastUpdated, sortBy, pageNumber, limit } = req.query;

  const query = { orgId: id };
  if (search) {
    const searchRegex = new RegExp(search, "i");
    query.$or = [{ id: searchRegex }, { name: searchRegex }];
  }
  if (type) {
    query.type = type;
  }
  if (lastUpdated) {
    const currentDate = new Date().getTime;
    const updatedSince = new Date(currentDate - lastUpdated);
    query.updatedAt = { $gte: updatedSince };
  }

  //sorting
  const sortOptions = {};
  if (sortBy === "name") {
    sortOptions.name = 1;
  } else if (sortBy === "update") {
    sortOptions.updatedAt = 1;
  } else if (sortBy == "count") {
    sortOptions.certificates = 1;
  } else {
    sortOptions.createdAt = 1;
  }

  // Pagination
  const skip = (pageNumber - 1) * limit;
  try {
    const events = await Event.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();

    return res.status(201).json(events);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Unable to fetch events at the moment" });
  }
};

module.exports = getEvents;
