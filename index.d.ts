/**
 * Copyright 2016-present, Deloitte Digital.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-3-Clause license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare module "react-habitat" {

	interface IDomFactory {

		/**
		 * The inject method after a wire-up has been requested
		 * @param {*}           module      - The component
		 * @param {object}      props       - The components properties
		 * @param {Element}     target      - The element to inject the component into
		 */
		inject: (module: any, props: {}, target: Element) => void;

		/**
		 * The dispose method
		 * @param {Element}		target		- The element to dispose
	     */
		dispose: (target: Element) => void;
	}

	interface IContainer {

		/**
		 * Register a new component in the container
		 * @param {string}      name        - The key that identifies this component
		 * @param {*}           comp        - The component class
		 * @deprecated Use an IContainerBuilder for registrations
		 */
		register: (name: string, comp: any) => void;

		/**
		 * Register multiple components in the container
		 * @param {object}      comps        - The components
		 * @deprecated Use an IContainerBuilder for registrations
		 */
		registerAll: (comps: {}) => void;

		/**
		 * Get a registered component for a key
		 * @param {string}      name        - The key name of the component that has been registered
		 */
		resolve: (name: string) => any;

		/**
		* The container's unique id
		*/
		id: string;

		/**
		 * The containers dom factory
		 */
		domFactory: () => IDomFactory;
	}

	interface IBootstrapper {

		/**
		  * Set the container
		  * @param {IContainer}		container	- The container
	      */
		setContainer: (container: IContainer) => void;

		/**
		 * Apply the container to an updated dom structure
		 */
		update: (node?: Element) => void;

		/**
		 * Start DOM watcher for auto wire ups
		 */
		startWatcher: () => void;

		/**
		 * Stop the DOM watcher if running
		 */
		stopWatcher: () => void;

		/**
		 * Dispose of the container
		*/
		dispose: () => void;
	}

	interface IRegistrationOptions extends Object {

		/**
		 * The tag to render with eg 'span'
		 */
		tag: string;

		/**
		 * The habitats class name
		 */
		className: string;

		/**
		 * If true, the original node will remain in the dom
		 */
		replaceDisabled: boolean;

	}

	interface IRegistration {

		/**
		 * Set the registration key, must be unique
		 * @param {string}  key     - The key
		 */
		as: (key: string) => IRegistration;

		/**
		 * Set the registration default props
		 */
		withDefaultProps: (defaultProps: any) => IRegistration;

		/**
		 * Set the habitat options
		 */
		withOptions: (options: IRegistrationOptions) => IRegistration;

	}

	interface IContainerBuilder {

		/**
		 * Register new component
		 */
		register: (operator: any) => IRegistration;

		/**
		 * The container factory
		 */
		factory: IDomFactory;

		/**
		 * Build the container
		 */
		build: () => IContainer;

	}

	class Bootstrapper implements IBootstrapper {

		/**
		 * Sets the container
		 */
		setContainer: (container: IContainer) => void;

		/**
		 * The component selector
		 */
		componentSelector: string;

		/**
		 * Apply the container to an updated dom structure
		 */
		update: (node?: Element) => void;

		/**
		 * Start DOM watcher for auto wire ups
		 */
		startWatcher: () => void;

		/**
		 * Stop the DOM watcher if running
		 */
		stopWatcher: () => void;

		/**
		 * Disposes the container
		 */
		dispose: () => void;
	}

	class Container implements IContainer {

		/**
		 * The containers unique id
		 */
		id: string;

		/**
		 * Register a component
		 */
		register: (name: string, comp: any) => void;

		/**
		 * Register a component
		 */
		registerAll: (comps: {}) => void;

		/**
		 * Resolve a component
		 */
		resolve: (name: string) => any;

		/**
		 * The containers dom factory
		 */
		domFactory: () => IDomFactory;
	}

	class ContainerBuilder implements IContainerBuilder {

		constructor(defaultOptions?: IRegistrationOptions);

		/**
		 * Register new component
		 */
		register: (operator: any) => IRegistration;

		/**
		 * The container factory
		 */
		factory: IDomFactory;

		/**
		 * Build the container
		 */
		build: () => IContainer;

	}
}
