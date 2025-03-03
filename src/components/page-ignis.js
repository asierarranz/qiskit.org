/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { LitElement, html, css } from 'lit-element';
import { localize } from '../pwa-helpers/i18next-localize-mixin.js';

import { i18next } from '../i18next.js';

import {
  SharedStyles,
  HeaderStyles,
  SectionStyles,
  SectionElementStyles,
  StackListStyles,
} from './app-shared-styles.js';
import { githubIcon } from './app-icons.js';
import './vaadin-ibmq-styles/vaadin-button.js';
import '@kuscamara/code-sample/code-sample.js';

import { trackClickEvent } from '../helpers/track-events.js';

class PageIgnis extends localize(i18next)(LitElement) {
  static get styles() {
    return [
      SharedStyles,
      HeaderStyles,
      SectionStyles,
      SectionElementStyles,
      StackListStyles,
      css`
        :host {
          --app-section-background-color: var(--qiskit-ignis-color);
          --app-section-color: #000000;
        }

        section.colored .row .description .actions vaadin-button {
          --ibmq-button-secondary-color: #000000;
          --ibmq-button-secondary-focus-color: var(--qiskit-ignis-color);
        }

        .stack-list.aqua-applications-domains::before {
          height: 50px;
        }

        section .description .badges a {
          text-decoration: none;
        }

        section .description .badges vaadin-button {
          --ibmq-button-secondary-color: #000000;
          --ibmq-button-secondary-focus-color: #ffffff;
        }

        section .description img + img {
          margin-top: 1em;
        }
      `,
    ];
  }

  render() {
    // prettier-ignore
    return html`
      <header>
        <img src="images/qiskit-ignis-logo.png" .alt=${i18next.t('pages.ignis.altLogo')}>
        <div>
          <h1>
            ${i18next.t('pages.ignis.headerTitle')}
          </h1>
          <h2>${i18next.t('pages.ignis.headerSubTitle')}</h2>
          <div class="badges">
            <a
              href="https://github.com/Qiskit/qiskit-ignis"
              target="_blank"
              rel="noopener"
              @click=${() => trackClickEvent({
                action: 'Qiskit Ignis: GitHub Repository',
                objectType: 'Button'
              })}
            >
              <vaadin-button theme="secondary small">${githubIcon} GitHub</vaadin-button>
            </a>
          </div>
        </div>
      </header>

      <section class="colored">
        <div class="row limited-width">
          <div class="description">
            <h3>${i18next.t('pages.ignis.aboutTitle')}</h3>
            <p>
              ${i18next.t('pages.ignis.aboutDescription')}
            </p>
            <h3>${i18next.t('pages.ignis.stackTitle')}</h3>
            <div class="stack-list">
              <div class="element">
                <div class="title">Circuits</div>
                <div class="subtitle">List of circuits generated by one if the ignis modules
                </div>
              </div>
              <div class="element">
                <div class="title">Qiskit Terra</div>
                <div class="subtitle">Compile circuits</div>
              </div>
              <div class="element">
                <div class="title">Execute circuits</div>
                <div class="subtitle">QasmSimulator, StatevectorSimulator, UnitarySimulator
                </div>
              </div>
              <div class="element">
                <div class="title">Result</div>
                <div class="subtitle">Counts, Memory, Statevector, Unitary, Snapshots</div>
              </div>
              <div class="element">
                <div class="title">Fitter/Filter</div>
                <div class="subtitle">Take Ignis results and fit to a model/plot results</div>
                <div class="subtitle">Apply mitigation (if applicable)</div>
              </div>
            </div>
          </div>
          <div class="illustration">
            <h3>${i18next.t('pages.ignis.installTitle')}</h3>
            <p class="note">${i18next.t('pages.ignis.pythonIsRequired')}</p>
            <code-sample type="bash">
              <template>
                [python3] $ pip install qiskit
              </template>
            </code-sample>
            <h3>${i18next.t('pages.ignis.exampleTitle')}</h3>
            <code-sample
              type="python"
              copy-clipboard-button
              @click=${() => trackClickEvent({
                action: 'Qiskit Ignis: Copy Code Sample',
                objectType: 'Button'
              })}
            >
              <!-- htmlmin:ignore -->
              <template>
                import qiskit
                from qiskit.providers.aer.noise import NoiseModel
                from qiskit.providers.aer.noise.errors.standard_errors import depolarizing_error

                # Import the RB Functions
                from qiskit.ignis.verification.randomized_benchmarking import randomized_benchmarking_seq, RBFitter

                #Generate RB circuits (2Q RB)
                rb_opts = {}
                rb_opts['length_vector'] = [1, 10, 20, 50, 75, 100, 125]
                rb_opts['nseeds'] = 5
                rb_opts['rb_pattern'] = [[0,1]]
                rb_circs, xdata = randomized_benchmarking_seq(**rb_opts)

                # Run on a noisy simulator
                noise_model = NoiseModel()
                noise_model.add_all_qubit_quantum_error(depolarizing_error(0.002, 1), ['u1', 'u2', 'u3'])
                noise_model.add_all_qubit_quantum_error(depolarizing_error(0.002, 2), 'cx')

                backend = qiskit.Aer.get_backend('qasm_simulator')

                #Create the RB fitter
                rb_fit = RBFitter(None, xdata, rb_opts['rb_pattern'])
                for rb_seed,rb_circ_seed in enumerate(rb_circs):

                    job = qiskit.execute(rb_circ_seed, backend=backend,
                         basis_gates=['u1','u2','u3','cx'],
                         noise_model=noise_model)

                    #add data to the fitter
                    rb_fit.add_data(job.result())
                    print('After seed %d, EPC %f'%(rb_seed,rb_fit.fit[0]['epc']))
              </template>
              <!-- htmlmin:ignore -->
            </code-sample>
          </div>
        </div>
      </section>
    `;
  }
}

window.customElements.define('page-ignis', PageIgnis);
