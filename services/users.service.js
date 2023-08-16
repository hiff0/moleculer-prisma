"use strict";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

/**
 * @typedef {import('moleculer').Context} Context
 */

module.exports = {
	name: "users",

	settings: {

	},

	dependencies: [],

	actions: {
		create: {
			params: {
				firstName: {
					type: "string",
					min: 2,
					messages: { stringMin: "The '{field}' field must be at least 2 character." }
				},
				lastName: {
					type: "string",
					min: 2,
					messages: { stringMin: "The '{field}' field must be at least 2 character." }
				},
			},
			async handler(ctx) {
				try {
					const {
						firstName,
						lastName
					} = ctx.params;
					const user = await prisma.user.create({
						data: {
							firstName,
							lastName,
						}
					});
					console.log('create: ', user);
					return user;
				} catch (err) {
					return err;
				}
			}
		},
		async getUsers() {
			try {
				const users = await prisma.user.findMany();
				console.log('get: ', users);
				return users;
			} catch (err) {
				return err;
			}
		},
        getOne: {
            params: {
                id: {
                    type: 'number'
                }
            },
            async handler(ctx) {
                try {
                    const user = await prisma.user.findUnique({
                        where: {
                            id: ctx.params.id,
                        }
                    });
					console.log('get: ', user);
				    return user;
                } catch (err) {
                    return err;
                }
            }
        },
        update: {
            params: {
                id: {
                    type: 'number'
                },
                firstName: {
					type: "string",
					min: 2,
					messages: { stringMin: "The '{field}' field must be at least 2 character." }
				},
				lastName: {
					type: "string",
					min: 2,
					messages: { stringMin: "The '{field}' field must be at least 2 character." }
				},
            },
            async handler(ctx) {
                try {
                    const {
                        id,
						firstName,
						lastName
					} = ctx.params;
                    const user = await prisma.user.findUnique({
                        where: {
                            id,
                        },
                        data: {
                            firstName,
						    lastName,
                        }
                    });
					console.log('update: ', user);
				    return user;
                } catch (err) {
                    return err;
                }
            }
        },
        delete: {
            params: {
                id: {
                    type: 'number'
                },
            },
            async handler(ctx) {
                try {
                    const user = await prisma.user.delete({
                        where: {
                            id: ctx.params.id,
                        }
                    });
					console.log('delete: ', user);
				    return user;
                } catch (err) {
                    return err;
                }
            }
        }

	},

	events: {

	}
};
