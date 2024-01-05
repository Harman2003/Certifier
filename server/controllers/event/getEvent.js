const Event = require("../../model/Event.js");

const getEvents = async (req, res) => {
  const { id, search, type, lastUpdated, sortBy, pageNumber, limit } = req.query;
  const query = { orgId: id };
  if (search) {
    const searchRegex = new RegExp(`^${search}`, "i");
    query.$or = [{ id: searchRegex }, { name: searchRegex }];
  }
  if (type && type!="All") {
    query.type = type;
  }
  if (lastUpdated && lastUpdated != 0) {
    const currentDate = new Date().getTime();
    console.log(lastUpdated, typeof lastUpdated)
    const updatedSince = new Date(currentDate - lastUpdated);
    console.log(updatedSince)
    query.updatedAt = { $gte: updatedSince };
  }

  //sorting
  const sortOptions = {};
  if (sortBy === "name") {
    sortOptions.name = 1;
  } else if (sortBy === "update") {
    sortOptions.updatedAt = -1;
  } else if (sortBy == "count") {
    sortOptions.certificates = 1;
  } else {
    sortOptions.createdAt = -1;
  }

  const skip = (parseInt(pageNumber) - 1) * parseInt(limit);
  try {
    const events = await Event.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();
    
    const totalEventCount = await Event.countDocuments(query);
    const totalPages = Math.ceil(totalEventCount / parseInt(limit));
    return res.status(201).json({events, total:totalPages});
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Unable to fetch events at the moment" });
  }
};

module.exports = getEvents;
