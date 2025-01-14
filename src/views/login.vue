<!-------------------------------------------------------------------------------------------------
 | hoobs-gui                                                                                      |
 | Copyright (C) 2020 HOOBS                                                                       |
 |                                                                                                |
 | This program is free software: you can redistribute it and/or modify                           |
 | it under the terms of the GNU General Public License as published by                           |
 | the Free Software Foundation, either version 3 of the License, or                              |
 | (at your option) any later version.                                                            |
 |                                                                                                |
 | This program is distributed in the hope that it will be useful,                                |
 | but WITHOUT ANY WARRANTY; without even the implied warranty of                                 |
 | MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                                  |
 | GNU General Public License for more details.                                                   |
 |                                                                                                |
 | You should have received a copy of the GNU General Public License                              |
 | along with this program.  If not, see <http://www.gnu.org/licenses/>.                          |
 -------------------------------------------------------------------------------------------------->

<template>
    <div :key="version" id="login">
        <modal :welcome="$t('login')" width="420px">
            <div v-if="errors.length > 0" class="errors">
                <span v-for="(error, index) in errors" :key="`error:${index}`">{{ error }}</span>
            </div>
            <form v-if="!loading" class="modal" autocomplete="false" method="post" action="/login" v-on:submit.prevent="login()">
                <input type="submit" class="hidden-submit" value="submit" />
                <div class="group">
                    <div class="upper">
                        <label for="username" class="label">{{ $t("username") }}</label>
                        <input type="text" id="username" ref="username" autocomplete="false" data-lpignore="true" v-model="username" v-on:keyup.enter="login" :required="true" />
                    </div>
                    <div class="lower">
                        <label for="password" class="label">{{ $t("password") }}</label>
                        <input type="password" id="password" ref="password" autocomplete="false" data-lpignore="true" v-model="password" v-on:keyup.enter="login" :required="true" />
                    </div>
                </div>
                <div class="remember">
                    <checkbox id="remember" :title="$t('remember_me')" v-model="remember" />
                </div>
            </form>
            <div v-else class="loading">
                <spinner />
            </div>
            <div class="actions modal">
                <div class="copyright">
                    Copyright &copy; {{ (new Date()).getFullYear() }} HOOBS, Inc. All rights reserved.
                </div>
                <div v-if="!loading" class="button primary" v-on:click="login()">{{ $t("login") }}</div>
            </div>
        </modal>
    </div>
</template>

<script>
    export default {
        name: "login",

        data() {
            return {
                loading: false,
                version: 0,
                url: "/",
                username: "",
                password: "",
                remember: true,
                errors: [],
            };
        },

        async mounted() {
            this.url = this.$route.query.url || "/";

            if (this.url.startsWith("/login")) this.url = "/";

            setTimeout(() => {
                if (this.$refs.username) this.$refs.username.focus();
            }, 500);
        },

        methods: {
            login() {
                this.errors = [];

                if (this.username === "" || this.username.length < 3) this.errors.push(this.$t("invalid_username_password"));

                if (this.errors.length === 0) {
                    this.loading = true;

                    this.$hoobs.auth.login(this.username.toLowerCase(), this.password, this.remember).then((response) => {
                        if (response) {
                            this.$router.push({ path: this.url });
                        } else {
                            this.errors.push(this.$t("invalid_username_password"));

                            this.username = "";
                            this.password = "";

                            this.loading = false;
                        }
                    }).catch((error) => {
                        this.errors.push(error.message);

                        this.username = "";
                        this.password = "";

                        this.loading = false;
                    });
                }
            },
        },
    };
</script>

<style lang="scss" scoped>
    #login {
        .errors {
            margin: 0 10px 10px 10px;
            display: flex;
            flex-direction: column;
            font-size: 14px;
            color: var(--modal-error-text);
            border-bottom: var(--modal-border) 1px solid;
        }

        form {
            flex: 1;
            margin: 0 10px;
            min-height: 153px;
        }

        .loading {
            flex: 1;
            margin: 0 10px;
            min-height: 153px;
        }

        .actions {
            min-height: 40px;
        }

        .group {
            .upper {
                display: flex;
                flex-direction: column;
                border-top: 1px var(--modal-border) solid;
                border-right: 1px var(--modal-border) solid;
                border-bottom: 1px var(--modal-border) solid;
                border-left: 1px var(--modal-border) solid;
                background: var(--modal-input);

                &:focus-within {
                    background: var(--modal-input-accent);
                }

                .label {
                    padding: 10px 10px 0 10px;
                    font-size: 12px;
                    user-select: none;
                }
            }

            &:focus-within {
                .upper {
                    border-top: 1px var(--modal-highlight) solid;
                    border-right: 1px var(--modal-highlight) solid;
                    border-left: 1px var(--modal-highlight) solid;
                }

                .lower {
                    border-right: 1px var(--modal-highlight) solid;
                    border-bottom: 1px var(--modal-highlight) solid;
                    border-left: 1px var(--modal-highlight) solid;
                }
            }

            .lower {
                display: flex;
                flex-direction: column;
                margin: -1px 0 0 0;
                border-right: 1px var(--modal-border) solid;
                border-bottom: 1px var(--modal-border) solid;
                border-left: 1px var(--modal-border) solid;
                background: var(--modal-input);

                &:focus-within {
                    background: var(--modal-input-accent);
                }

                .label {
                    padding: 10px 10px 0 10px;
                    border-top: 1px var(--modal-background) solid;
                    font-size: 12px;
                    user-select: none;
                }
            }

            input {
                border: 0 none;
                outline: 0 none;
                padding: 5px 10px 10px 10px;
                background: transparent;
                color: var(--modal-input-text);
                font-size: 15px;

                &:focus {
                    border: 0 none;
                    outline: 0 none;
                }
            }
        }

        .remember {
            display: flex;
            align-content: center;
            align-items: center;
            padding: 7px 0 0 2px;
        }
    }

    [platform="mobile"] {
        #login {
            padding: 0;
            background: unset;
            align-items: unset;

            .errors {
                border-bottom: 0 none;
            }
        }
    }

    [platform="tablet"] {
        @media only screen and (orientation:portrait) {
            #login {
                padding: 0;
                background: unset;
                align-items: unset;

                .errors {
                    border-bottom: 0 none;
                }
            }
        }
    }
</style>
