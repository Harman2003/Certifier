function customProfilePic(fullname) {
    const name = fullname.split(' ');
    const first = name[0] || "";
    const last = name[1] || "";
  return `https://eu.ui-avatars.com/api/?name=${first}+${last}&size=460`;
}

module.exports = customProfilePic;
