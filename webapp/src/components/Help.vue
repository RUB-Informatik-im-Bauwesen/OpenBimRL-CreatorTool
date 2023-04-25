<script setup lang="ts">
import { XMarkIcon } from "@heroicons/vue/24/solid";

import LinkedInLogo from "../assets/linkedin_logo.png";
import TwitterLogo from "../assets/twitter_logo.svg";
import GithubMark from "../assets/github-mark.svg";

const date = new Date();
</script>

<template>
    <aside class="top-0 right-0 bg-gray-100 px-3 py-2 h-full w-1/5 z-50 fixed">
        <div class="flex justify-between">
            <button @click="$emit('close')">
                <XMarkIcon class="h-8 w-8 inline" />
            </button>
            <h3 class="text-3xl"><strong>Information</strong></h3>
        </div>
        <div class="pl-4">
            <h4 class="text-2xl">Über OpenBimRL Creator</h4>
            <p class="text-sm" style="text-align: justify">
                Angelehnt an der graphen-basierten Programmierung beschreibt das
                OpenBimRL Format eine Regelsprache zur formellen und fachlichen
                Prüfung von Bauwerksmodellen. Das Format definiert eine
                dynamisch erweiterbare Schnittstelle auf derer Basis Bausteine
                für einen graphen-basierten Prüfvorgang konstruiert und
                verknüpft werden können. Bei der Entwicklung wurde Wert auf
                Offenheit und Transparenz der Prüfungdokumente gelegt.
            </p>

            <h4>Entwickelt von</h4>
            <a
                href="https://www.inf.bi.ruhr-uni-bochum.de/"
                class="bg-white flex p-4 rounded-md border border-gray-200"
            >
                <img
                    src="https://www.inf.bi.ruhr-uni-bochum.de/iib/mam/images/logos/logo_menue_de.png"
                    class="h-full"
                />
            </a>

            <br />

            <table class="text-sm">
                <tr>
                    <td><b>Institution:</b></td>
                    <td>
                        Lehrstuhl für Informatik im Bauwesen <br />
                        an der Ruhr-Universität Bochum
                    </td>
                </tr>
                <tr>
                    <td><b>Entwickler:</b></td>
                    <td>Marcel Stepien</td>
                </tr>
                <tr>
                    <td><b>E-Mail:</b></td>
                    <td>marcel.stepien@ruhr-uni-bochum.de</td>
                </tr>
                <tr>
                    <td><b>Datum:</b></td>
                    <td>
                        {{ date.getDate() }}.{{ date.getMonth() }}.{{
                            date.getFullYear()
                        }}
                    </td>
                </tr>
            </table>

            <div class="flex gap-4 w-full mt-4">
                <a
                    href="https://www.linkedin.com/company/lehrstuhl-f%C3%BCr-informatik-im-bauwesen"
                >
                    <img loading="lazy" :src="LinkedInLogo" class="w-12" />
                </a>
                <a href="https://twitter.com/iib_rub">
                    <img loading="lazy" :src="TwitterLogo" class="w-12">
                </a>
                <a href="https://github.com/RUB-Informatik-im-Bauwesen">
                    <img loading="lazy" :src="GithubMark" class="w-12">
                </a>
            </div>
        </div>
    </aside>
</template>

<style scoped>
td:first-child{
    vertical-align: baseline;
}
</style>
