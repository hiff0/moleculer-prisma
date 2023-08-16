"use strict";

const ApiGateway = require("moleculer-web");

/**
 * @typedef {import('moleculer-web').ApiSettingsSchema} ApiSettingsSchema API Setting Schema
 */

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	/** @type {ApiSettingsSchema} */
	settings: {
		port: process.env.PORT || 8080,

		ip: "0.0.0.0",

		use: [],

		routes: [
			{
				path: "/users",

				whitelist: [
					"**"
				],

				mergeParams: true,
				authentication: false,
				authorization: false,
				autoAliases: true,

				aliases: {
					'GET /': 'users.getUsers',
					'GET /:id': 'users.getOne',
          			'POST /': 'users.create',
					'PUT /:id': 'users.update',
					'DELETE /:id': 'users.delete'
				},

				bodyParsers: {
					json: {
						strict: false,
						limit: "1MB"
					},
					urlencoded: {
						extended: true,
						limit: "1MB"
					}
				},

				mappingPolicy: "all",

				logging: true
			}
		],

		log4XXResponses: false,
		logRequestParams: null,
		logResponseData: null,

		assets: {
			folder: "public",

			options: {}
		}
	},
};
