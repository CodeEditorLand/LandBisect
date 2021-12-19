/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import https from 'https';

export function jsonGet<T>(url: string): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            if (res.statusCode === 204) {
                return resolve(undefined); // no update available
            }

            if (res.statusCode !== 200) {
                reject(`Failed to get response from update server (code: ${res.statusCode}, message: ${res.statusMessage})`);
                return;
            }

            let data = '';

            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
            res.on('error', err => reject(err));
        });
    });
}