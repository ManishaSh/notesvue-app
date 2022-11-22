import {shallowMount} from '@vue/test-utils'
import App from '../../src/App.vue'


describe('App', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message'
        const wrapper = shallowMount(App, {
            props: { msg }
        })
        expect(wrapper.text()).toMatch(msg)
    })
})