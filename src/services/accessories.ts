/**************************************************************************************************
 * hoobs-gui                                                                                      *
 * Copyright (C) 2020 HOOBS                                                                       *
 *                                                                                                *
 * This program is free software: you can redistribute it and/or modify                           *
 * it under the terms of the GNU General Public License as published by                           *
 * the Free Software Foundation, either version 3 of the License, or                              *
 * (at your option) any later version.                                                            *
 *                                                                                                *
 * This program is distributed in the hope that it will be useful,                                *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of                                 *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                                  *
 * GNU General Public License for more details.                                                   *
 *                                                                                                *
 * You should have received a copy of the GNU General Public License                              *
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.                          *
 **************************************************************************************************/

export function types(type: string): string | undefined {
    switch (type) {
        case "light":
            return "light-accessory";

        case "switch":
        case "outlet":
            return "switch-accessory";

        case "fan":
            return "fan-accessory";

        default:
            return undefined;
    }
}

export function accessories(): { [key: string]: () => any } {
    return {
        "fan-accessory": () => import(/* webpackChunkName: "accessory-light" */ "@/components/accessories/fan.vue"),
        "light-accessory": () => import(/* webpackChunkName: "accessory-light" */ "@/components/accessories/light.vue"),
        "switch-accessory": () => import(/* webpackChunkName: "accessory-switch" */ "@/components/accessories/switch.vue"),
    };
}