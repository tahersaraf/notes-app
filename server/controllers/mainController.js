/**
 *  Get Homepage
 */
exports.homepage = async (req, res) => {
  const locals = {
    title: "Notes",
    description: "Notes App",
  };

  res.render("index", {
    locals,
    layout: "../views/layouts/front-page",
  });
};

/**
 *  Get About
 */
exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "About Notes App",
  };

  res.render("about", locals);
};
