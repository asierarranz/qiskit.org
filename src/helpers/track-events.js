/**
 * @license
 *
 * Copyright (c) 2019, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

export const trackClickEvent = ({ action, objectType }) => {
  if (window.bluemixAnalytics && window.digitalData) {
    const segmentEvent = {
      productTitle: window.digitalData.page.pageInfo,
      category: window.digitalData.page.pageInfo.analytics,
      url: window.location.href,
      path: window.location.pathname,
      action: `Button Clicked: ${action}`,
      objectType,
      successFlag: true,
    };

    window.bluemixAnalytics.trackEvent('Custom Event', segmentEvent);
  }
};

export const trackSelectCombo = data => {
  if (window.bluemixAnalytics && window.digitalData) {
    const segmentEvent = {
      productTitle: window.digitalData.page.pageInfo,
      category: window.digitalData.page.pageInfo.analytics,
      url: window.location.href,
      path: window.location.pathname,
      action: `Language Changed to: ${data.text}`,
      objectType: 'Select Combobox',
      successFlag: true,
    };

    window.bluemixAnalytics.trackEvent('Custom Event', segmentEvent);
  }
};
