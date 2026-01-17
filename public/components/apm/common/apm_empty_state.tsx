/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  EuiButton,
  EuiLink,
  EuiSpacer,
  EuiText,
  EuiButtonGroup,
  EuiImage,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
} from '@elastic/eui';
import servicesPreview from './assets/services-preview.png';
import { apmEmptyStateI18nTexts as i18nTexts, getPreviewImageAlt } from './apm_empty_state_i18n';

const APM_DOCS_URL = 'https://docs.opensearch.org/latest/observing-your-data/';

interface TabContent {
  id: string;
  name: string;
  description: string;
}

const options: TabContent[] = [
  {
    id: 'services',
    name: i18nTexts.tabs.services.name,
    description: i18nTexts.tabs.services.description,
  },
  {
    id: 'application-map',
    name: i18nTexts.tabs.applicationMap.name,
    description: i18nTexts.tabs.applicationMap.description,
  },
  {
    id: 'correlate-traces-logs',
    name: i18nTexts.tabs.correlateTracesLogs.name,
    description: i18nTexts.tabs.correlateTracesLogs.description,
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
        <EuiSpacer size="xxl" />
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

        <EuiSpacer size="l" />

        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem grow={false}>
            <EuiLink href={APM_DOCS_URL} target="_blank" external={false}>
              {i18nTexts.viewDocs}
            </EuiLink>
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="xxl" />

        {/* Panel containing button group, description, and preview */}
        <EuiPanel paddingSize="l">
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
              overflow: 'hidden',
              maxWidth: '900px',
              margin: '0 auto',
              backgroundOrigin: 'padding-box, border-box',
              backgroundClip: 'padding-box, border-box',
            }}
          >
            <EuiImage
              src={servicesPreview}
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
