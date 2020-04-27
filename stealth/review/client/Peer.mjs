
import { isFunction                                                   } from '../../../base/index.mjs';
import { after, before, describe, finish                              } from '../../../covert/index.mjs';
import { hostname                                                     } from '../../../stealth/source/ENVIRONMENT.mjs';
import { Peer                                                         } from '../../../stealth/source/client/Peer.mjs';
import { connect as connect_stealth, disconnect as disconnect_stealth } from '../Stealth.mjs';
import { connect as connect_client, disconnect as disconnect_client   } from '../Client.mjs';



before(connect_stealth);
before(connect_client);

describe('new Peer()', function(assert) {

	assert(this.client.services.peer instanceof Peer, true);

});

describe('Peer.prototype.save()', function(assert) {

	assert(this.client !== null);
	assert(isFunction(this.client.services.peer.save), true);

	this.client.services.peer.save({
		host:       '127.0.0.3',
		connection: 'mobile'
	}, (response) => {
		assert(response, true);
	});

});

describe('Peer.prototype.info()', function(assert) {

	assert(this.client !== null);
	assert(isFunction(this.client.services.peer.info), true);

	this.client.services.peer.info({
		host: '127.0.0.3'
	}, (response) => {

		assert(response !== null);
		assert(response.domain,     hostname);
		assert(response.connection, 'mobile');

	});

});

describe('Peer.prototype.read()', function(assert) {

	assert(this.client !== null);
	assert(isFunction(this.client.services.peer.read), true);

	this.client.services.peer.read({
		host: '127.0.0.3'
	}, (response) => {

		assert(response !== null);
		assert(response, {
			domain:     '127.0.0.3',
			connection: 'mobile'
		});

	});

});

describe('Peer.prototype.proxy()/success', function(assert) {

	assert(this.client !== null);
	assert(isFunction(this.client.services.peer.proxy), true);

	this.client.services.peer.proxy({
		host: '127.0.0.3',
		headers: {
			service: 'settings',
			method:  'read'
		},
		payload: {
			internet: true
		}
	}, (response) => {

		assert(response !== null);
		assert(response.internet, {
			connection: 'mobile',
			history:    'stealth',
			useragent:  'stealth'
		});

	});

});

describe('Peer.prototype.refresh()', function(assert) {

	assert(this.client !== null);
	assert(isFunction(this.client.services.peer.refresh), true);

	this.client.services.peer.refresh({
		host: '127.0.0.3'
	}, (response) => {

		assert(response !== null);
		assert(response, {
			domain:     '127.0.0.3',
			connection: 'mobile'
		});

	});

});

describe('Peer.prototype.remove()/success', function(assert) {

	assert(this.client !== null);
	assert(isFunction(this.client.services.peer.remove), true);

	this.client.services.peer.remove({
		host: '127.0.0.3'
	}, (response) => {
		assert(response, true);
	});

});

describe('Peer.prototype.proxy()/failure', function(assert) {

	assert(this.client !== null);
	assert(isFunction(this.client.services.peer.proxy), true);

	this.client.services.peer.proxy({
		host: '127.0.0.3',
		headers: {
			service: 'settings',
			method:  'read'
		},
		payload: {
			internet: true
		}
	}, (response) => {
		assert(response, null);
	});

});

describe('Peer.prototype.remove()/success', function(assert) {

	assert(this.client !== null);
	assert(isFunction(this.client.services.peer.remove), true);

	this.client.services.peer.remove({
		host: '127.0.0.3'
	}, (response) => {
		assert(response, true);
	});

});


after(disconnect_client);
after(disconnect_stealth);


export default finish('stealth/client/Peer');

