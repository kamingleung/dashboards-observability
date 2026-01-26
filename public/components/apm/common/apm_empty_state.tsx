/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiSpacer,
  EuiText,
  EuiButtonGroup,
  EuiImage,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from '@elastic/eui';
import servicesPreview from './assets/services-preview.png';
import mapPreview from './assets/maps-preview.png';
import tracesPreview from './assets/traces-preview.png';
import { apmEmptyStateI18nTexts as i18nTexts, getPreviewImageAlt } from './apm_empty_state_i18n';
import './apm_empty_state.scss';

const APM_DOCS_URL = 'https://docs.opensearch.org/latest/observing-your-data/';

interface TabContent {
  id: string;
  name: string;
  description: string;
  previewImage: string;
}

const options: TabContent[] = [
  {
    id: 'services',
    name: i18nTexts.tabs.services.name,
    description: i18nTexts.tabs.services.description,
    previewImage: servicesPreview,
  },
  {
    id: 'application-map',
    name: i18nTexts.tabs.applicationMap.name,
    description: i18nTexts.tabs.applicationMap.description,
    previewImage: mapPreview, // TODO: Replace with application-map-preview.png when available
  },
  {
    id: 'correlate-traces-logs',
    name: i18nTexts.tabs.correlateTracesLogs.name,
    description: i18nTexts.tabs.correlateTracesLogs.description,
    previewImage: tracesPreview, // TODO: Replace with correlate-traces-logs-preview.png when available
  },
];

export interface ApmEmptyStateProps {
  onGetStartedClick: () => void;
}

export const ApmEmptyState = ({ onGetStartedClick }: ApmEmptyStateProps) => {
  const [selectedTabId, setSelectedTabId] = useState('services');

  const selectedTab = options.find((tab) => tab.id === selectedTabId) || options[0];

  const buttonGroupOptions = options.map((option) => ({
    id: option.id,
    label: option.name,
  }));

  return (
    <EuiFlexGroup direction="column" alignItems="center" gutterSize="none">
      <EuiFlexItem grow={false}>
        {/* Panel containing all content */}
        <EuiPanel paddingSize="l" className="apmEmptyStatePanel">
          <EuiText textAlign="center">
            <h1>{i18nTexts.title}</h1>
          </EuiText>

          <EuiSpacer size="l" />

          <EuiFlexGroup justifyContent="center" gutterSize="m">
            <EuiFlexItem grow={false}>
              <EuiButton fill onClick={onGetStartedClick}>
                {i18nTexts.getStarted}
              </EuiButton>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiSpacer size="s" />

          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                href={APM_DOCS_URL}
                target="_blank"
                iconType="popout"
                iconSide="right"
                color="primary"
              >
                {i18nTexts.viewDocs}
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiSpacer size="xl" />

          {/* Button Group */}
          <EuiFlexGroup justifyContent="center">
            <EuiFlexItem grow={false}>
              <EuiButtonGroup
                legend="APM feature selection"
                options={buttonGroupOptions}
                idSelected={selectedTabId}
                onChange={(id) => setSelectedTabId(id)}
                buttonSize="compressed"
                isFullWidth={false}
              />
            </EuiFlexItem>
          </EuiFlexGroup>

          <EuiSpacer size="m" />

          {/* Tab content */}
          <EuiText textAlign="center" size="m">
            <p>{selectedTab.description}</p>
          </EuiText>

          <EuiSpacer size="m" />

          {/* Preview image */}
          <div
            style={{
              border: '2px solid transparent',
              borderRadius: '6px',
              // overflow: 'hidden',
              maxWidth: '900px',
              margin: '0 auto',
              backgroundOrigin: 'padding-box, border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <EuiImage
              hasShadow={true}
              src={selectedTab.previewImage}
              alt={getPreviewImageAlt(selectedTab.name)}
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </EuiPanel>

        <EuiSpacer size="xxl" />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
