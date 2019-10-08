const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 11);

  const user = await context.prisma.createUser({ ...args, password });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('No such user found.');
  }

  const validPassword = await bcrypt.compare(args.password, user.password);
  if (!validPassword) {
    throw new Error('Invalid password.');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

function postLink(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
}

function postAirplane(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createAirplane({
    single_engine: args.single_engine,
    multi_engine: args.multi_engine,
    make: args.make,
    model: args.model,
    production_year: args.production_year,
    complex: args.complex,
    retractable_landing_gear: args.retractable_landing_gear,
    high_wing: args.high_wing,
    low_wing: args.low_wing,
    total_time: args.total_time,
    time_between_overhaul: args.time_between_overhaul,
    currently_rented: args.currently_rented,
    userInPossession: { connect: { id: userId } }
  });
}

module.exports = {
  signup,
  login,
  postLink,
  postAirplane
};
