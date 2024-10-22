import { cn } from "@/components/utils";
import type { Icons } from "@/components/Icons";
import {
  CheckCircle,
  InformationCircle,
  ExclamationCircle,
  ExclamationTriangle,
} from "@/components/Icons";

export type ToastProps = {
  title?: string;
  description?: string;
  type?: "default" | "success" | "info" | "warning" | "danger";
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  html?: string;
};

type ToastVariants = {
  type: Record<string, { class: string; Icon?: Icons; iconClass?: string }>;
  position: Record<string, string>;
};

const toastVariants: ToastVariants = {
  type: {
    default: { class: "bg-background text-foreground" },
    success: { class: "bg-background text-green-500", Icon: CheckCircle },
    info: { class: "bg-background text-blue-500", Icon: InformationCircle },
    warning: {
      class: "bg-background text-orange-400",
      Icon: ExclamationTriangle,
    },
    danger: { class: "bg-background text-red-500", Icon: ExclamationCircle },
  },
  position: {
    "top-left": "left-0 top-0 sm:mt-6 sm:ml-6",
    "top-center": "left-1/2 -translate-x-1/2 top-0 sm:mt-6",
    "top-right": "right-0 top-0 sm:mt-6 sm:mr-6",
    "bottom-left": "left-0 bottom-0 sm:ml-6 sm:mb-6",
    "bottom-center": "left-1/2 -translate-x-1/2 bottom-0 sm:mb-6",
    "bottom-right": "right-0 bottom-0 sm:mr-6 sm:mb-6",
  },
};

const toastTypes = Object.keys(toastVariants.type);

export function Notification() {
  return (
    <div class="relative w-auto h-auto" x-data>
      <div
        x-data="{ 
            title: 'Default Toast Notification', 
            description: '',
            type: 'default',
            position: 'top-center',
            expanded: false,
            popToast (custom){
                let html = '';
                if(typeof custom != 'undefined'){
                    html = custom;
                }
                toast(this.title, { description: this.description, type: this.type, position: this.position, html: html })
            }
        }"
        x-init="
            window.toast = function(message, options = {}){
                let description = '';
                let type = 'default';
                let position = 'top-center';
                let html = '';
                if(typeof options.description != 'undefined') description = options.description;
                if(typeof options.type != 'undefined') type = options.type;
                if(typeof options.position != 'undefined') position = options.position;
                if(typeof options.html != 'undefined') html = options.html;
                
                window.dispatchEvent(new CustomEvent('toast-show', { detail : { type: type, message: message, description: description, position : position, html: html }}));
            }

            window.customToastHTML = `
                <div class='relative flex items-start justify-center p-4'>
                    <img src='https://local.yonx.app/images/120x120/90/shinobu.jpg' class='w-10 h-10 mr-2 rounded-full'>
                    <div class='flex flex-col'>
                        <p class='text-sm font-medium text-gray-800'>New Friend Request</p>
                        <p class='mt-1 text-xs leading-none text-gray-800'>Friend request from Shinobu.</p>
                        <div class='flex mt-3'>
                            <button type='button' @click='burnToast(toast.id)' class='inline-flex items-center px-2 py-1 text-xs font-semibold text-white bg-indigo-600 rounded shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Accept</button>
                            <button type='button' @click='burnToast(toast.id)' class='inline-flex items-center px-2 py-1 ml-3 text-xs font-semibold text-gray-900 bg-white rounded shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'>Decline</button>
                        </div>
                    </div>
                </div>
            `
        "
        class="relative space-y-5"
      >
        <div class="relative">
          <p class="mb-2 text-xs font-medium text-center text-gray-500 sm:text-left">
            Types
          </p>
          <div class="relative flex flex-col px-10 space-y-2 sm:space-x-5 sm:space-y-0 sm:flex-row sm:px-0">
            <button
              x-on:click="title='Default Toast Notification'; type='default'; description=''; popToast()"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : type=='default' && description=='' }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Default
            </button>
            <button
              x-on:click="title='Toast Notification'; type='default'; description='This is an example toast notification'; popToast()"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : type=='default' && description!='' }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              With Description
            </button>
            <button
              x-on:click="title='Success Notification'; type='success'; popToast()"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : type=='success' }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Success
            </button>
            <button
              x-on:click="title='Info Notification'; type='info'; popToast()"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : type=='info' }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Info
            </button>
            <button
              x-on:click="title='Warning Notification'; type='warning'; popToast()"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : type=='warning' }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Warning
            </button>
            <button
              x-on:click="title='Danger Notification'; type='danger'; popToast()"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : type=='danger' }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Danger
            </button>

            <button
              x-on:click="popToast(customToastHTML)"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : type=='success' }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Custom
            </button>
          </div>
        </div>
        <div class="relative">
          <p class="mb-2 text-xs font-medium text-center text-gray-500 sm:text-left">
            Position
          </p>
          <div class="relative flex flex-col px-10 space-y-2 sm:space-x-5 sm:space-y-0 sm:flex-row sm:px-0">
            <button
              x-on:click="position='top-left'; popToast()"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : position=='top-left' }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Top Left
            </button>
            <button
              x-on:click="position='top-center'; popToast()"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : position=='top-center' }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Top Center
            </button>
            <button
              x-on:click="position='top-right'; popToast()"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : position=='top-right' }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Top Right
            </button>
            <button
              x-on:click="position='bottom-right'; popToast()"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : position=='bottom-right' }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Bottom Right
            </button>
            <button
              x-on:click="position='bottom-center'; popToast()"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : position=='bottom-center' }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Bottom Center
            </button>
            <button
              x-on:click="position='bottom-left'; popToast()"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : position=='bottom-left' }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Bottom Left
            </button>
          </div>
        </div>
        <div class="relative">
          <p class="mb-2 text-xs font-medium text-center text-gray-500 sm:text-left">
            Layout
          </p>
          <div class="relative flex flex-col px-10 space-y-2 sm:space-x-5 sm:space-y-0 sm:flex-row sm:px-0">
            <button
              x-on:click="expanded=false; window.dispatchEvent(new CustomEvent('set-toasts-layout', { detail: { layout: 'default' }}));"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : !expanded }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Default
            </button>
            <button
              x-on:click="expanded=true; window.dispatchEvent(new CustomEvent('set-toasts-layout', { detail: { layout: 'expanded' }}));"
              x-bind:class="{ 'ring-2 ring-neutral-200/60' : expanded }"
              class="inline-flex items-center justify-center flex-shrink-0 px-3 py-1 text-xs font-medium transition-colors border rounded-md h-9 hover:bg-gray-50 active:bg-white focus:bg-white focus:outline-none"
            >
              Expanded
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Toast() {
  return (
    <div x-data>
      <template x-teleport="body">
        <ul
          x-data="{ 
                toasts: [],
                toastsHovered: false,
                expanded: false,
                layout: 'default',
                position: 'top-center',
                paddingBetweenToasts: 15,
                deleteToastWithId (id){
                    for(let i = 0; i < this.toasts.length; i++){
                        if(this.toasts[i].id === id){
                            this.toasts.splice(i, 1);
                            break;
                        }
                    }
                },
                burnToast(id){
                    burnToast = this.getToastWithId(id);
                    burnToastElement = document.getElementById(burnToast.id);
                    if(burnToastElement){
                        if(this.toasts.length == 1){
                            if(this.layout=='default'){
                                this.expanded = false;
                            }
                            burnToastElement.classList.remove('translate-y-0');
                            if(this.position.includes('bottom')){
                                burnToastElement.classList.add('translate-y-full');
                            } else {
                                burnToastElement.classList.add('-translate-y-full');
                            }
                            burnToastElement.classList.add('-translate-y-full');
                        }
                        burnToastElement.classList.add('opacity-0');
                        let that = this;
                        setTimeout(function(){
                            that.deleteToastWithId(id);
                            setTimeout(function(){
                                that.stackToasts();
                            }, 1)
                        }, 300);
                    }
                },
                getToastWithId(id){
                    for(let i = 0; i < this.toasts.length; i++){
                        if(this.toasts[i].id === id){
                            return this.toasts[i];
                        }
                    }
                },
                stackToasts(){
                    this.positionToasts();
                    this.calculateHeightOfToastsContainer();
                    let that = this;
                    setTimeout(function(){
                        that.calculateHeightOfToastsContainer();
                    }, 300);
                },
                positionToasts(){
                    if(this.toasts.length == 0) return;
                    let topToast = document.getElementById( this.toasts[0].id );
                    topToast.style.zIndex = 100;
                    if(this.expanded){
                        if(this.position.includes('bottom')){
                            topToast.style.top = 'auto';
                            topToast.style.bottom = '0px';
                        } else {
                            topToast.style.top = '0px';
                        }
                    }

                    let bottomPositionOfFirstToast = this.getBottomPositionOfElement(topToast);

                    if(this.toasts.length == 1) return;
                    let middleToast = document.getElementById( this.toasts[1].id );
                    middleToast.style.zIndex = 90;

                    if(this.expanded){
                        middleToastPosition = topToast.getBoundingClientRect().height +
                                                this.paddingBetweenToasts + 'px';

                        if(this.position.includes('bottom')){
                            middleToast.style.top = 'auto';
                            middleToast.style.bottom = middleToastPosition;
                        } else {
                            middleToast.style.top = middleToastPosition;
                        }

                        middleToast.style.scale = '100%';
                        middleToast.style.transform = 'translateY(0px)';
                        
                    } else {
                        middleToast.style.scale = '94%';
                        if(this.position.includes('bottom')){
                            middleToast.style.transform = 'translateY(-16px)';
                        } else {
                            this.alignBottom(topToast, middleToast);
                            middleToast.style.transform = 'translateY(16px)';
                        }
                    }
                    

                    if(this.toasts.length == 2) return;
                    let bottomToast = document.getElementById( this.toasts[2].id );
                    bottomToast.style.zIndex = 80;
                    if(this.expanded){
                        bottomToastPosition = topToast.getBoundingClientRect().height + 
                                                this.paddingBetweenToasts + 
                                                middleToast.getBoundingClientRect().height +
                                                this.paddingBetweenToasts + 'px';
                        
                        if(this.position.includes('bottom')){
                            bottomToast.style.top = 'auto';
                            bottomToast.style.bottom = bottomToastPosition;
                        } else {
                            bottomToast.style.top = bottomToastPosition;
                        }

                        bottomToast.style.scale = '100%';
                        bottomToast.style.transform = 'translateY(0px)';
                    } else {
                        bottomToast.style.scale = '88%';
                        if(this.position.includes('bottom')){
                            bottomToast.style.transform = 'translateY(-32px)';
                        } else {
                            this.alignBottom(topToast, bottomToast);
                            bottomToast.style.transform = 'translateY(32px)';
                        }
                    }

                    

                    if(this.toasts.length == 3) return;
                    let burnToast = document.getElementById( this.toasts[3].id );
                    burnToast.style.zIndex = 70;
                    if(this.expanded){
                        burnToastPosition = topToast.getBoundingClientRect().height + 
                                                this.paddingBetweenToasts + 
                                                middleToast.getBoundingClientRect().height + 
                                                this.paddingBetweenToasts + 
                                                bottomToast.getBoundingClientRect().height + 
                                                this.paddingBetweenToasts + 'px';
                        
                        if(this.position.includes('bottom')){
                            burnToast.style.top = 'auto';
                            burnToast.style.bottom = burnToastPosition;
                        } else {
                            burnToast.style.top = burnToastPosition;
                        }

                        burnToast.style.scale = '100%';
                        burnToast.style.transform = 'translateY(0px)';
                    } else {
                        burnToast.style.scale = '82%';
                        this.alignBottom(topToast, burnToast);
                        burnToast.style.transform = 'translateY(48px)';
                    }

                    burnToast.firstElementChild.classList.remove('opacity-100');
                    burnToast.firstElementChild.classList.add('opacity-0');

                    let that = this;
                    // Burn 🔥 (remove) last toast
                    setTimeout(function(){
                            that.toasts.pop();
                        }, 300);

                    if(this.position.includes('bottom')){
                            middleToast.style.top = 'auto';
                    }

                    return;
                },
                alignBottom(element1, element2) {
                    // Get the top position and height of the first element
                    let top1 = element1.offsetTop;
                    let height1 = element1.offsetHeight;

                    // Get the height of the second element
                    let height2 = element2.offsetHeight;

                    // Calculate the top position for the second element
                    let top2 = top1 + (height1 - height2);

                    // Apply the calculated top position to the second element
                    element2.style.top = top2 + 'px';
                },
                alignTop(element1, element2) {
                    // Get the top position of the first element
                    let top1 = element1.offsetTop;

                    // Apply the same top position to the second element
                    element2.style.top = top1 + 'px';
                },
                resetBottom(){
                    for(let i = 0; i < this.toasts.length; i++){
                        if(document.getElementById( this.toasts[i].id )){
                            let toastElement = document.getElementById( this.toasts[i].id );
                            toastElement.style.bottom = '0px';
                        }
                    }
                },
                resetTop(){
                    for(let i = 0; i < this.toasts.length; i++){
                        if(document.getElementById( this.toasts[i].id )){
                            let toastElement = document.getElementById( this.toasts[i].id );
                            toastElement.style.top = '0px';
                        }
                    }
                },
                getBottomPositionOfElement(el){
                    return (el.getBoundingClientRect().height + el.getBoundingClientRect().top);
                },
                calculateHeightOfToastsContainer(){
                    if(this.toasts.length == 0){
                        $el.style.height = '0px';
                        return;
                    }

                    lastToast = this.toasts[this.toasts.length - 1];
                    lastToastRectangle = document.getElementById(lastToast.id).getBoundingClientRect();
                    
                    firstToast = this.toasts[0];
                    firstToastRectangle = document.getElementById(firstToast.id).getBoundingClientRect();

                    if(this.toastsHovered){
                        if(this.position.includes('bottom')){
                            $el.style.height = ((firstToastRectangle.top + firstToastRectangle.height) - lastToastRectangle.top) + 'px';
                        } else {
                            $el.style.height = ((lastToastRectangle.top + lastToastRectangle.height) - firstToastRectangle.top) + 'px';
                        }
                    } else {
                        $el.style.height = firstToastRectangle.height + 'px';
                    }
                }
            }"
          {...{
            "@set-toasts-layout.window": `
                layout=event.detail.layout;
                if(layout == 'expanded'){
                    expanded=true;
                } else {
                    expanded=false;
                }
                stackToasts();
            `,
            "@toast-show.window": `event.stopPropagation();
                if(event.detail.position){
                    position = event.detail.position;
                }
                toasts.unshift({
                    id: 'toast-' + Math.random().toString(16).slice(2),
                    show: false,
                    message: event.detail.message,
                    description: event.detail.description,
                    type: event.detail.type,
                    html: event.detail.html
                });`,
          }}
          x-on:mouseenter="toastsHovered=true;"
          x-on:mouseleave="toastsHovered=false"
          x-init="
                if(layout == 'expanded'){
                    expanded = true;
                }
                stackToasts();
                $watch('toastsHovered', function(value){

                    if(layout == 'default'){
                        if(position.includes('bottom')){
                            resetBottom();
                        } else {
                            resetTop();
                        }

                        if(value){
                            // calculate the new positions
                            expanded = true;
                            if(layout == 'default'){
                                stackToasts();
                            }
                        } else {
                            if(layout == 'default'){
                                expanded = false;
                                //setTimeout(function(){
                                stackToasts();
                            //}, 10);
                                setTimeout(function(){
                                    stackToasts();
                                }, 10)
                            }
                        }
                    }
                });
            "
          class="fixed block w-full group z-[99] sm:max-w-xs"
          x-bind:class="{ 'right-0 top-0 sm:mt-6 sm:mr-6': position=='top-right', 'left-0 top-0 sm:mt-6 sm:ml-6': position=='top-left', 'left-1/2 -translate-x-1/2 top-0 sm:mt-6': position=='top-center', 'right-0 bottom-0 sm:mr-6 sm:mb-6': position=='bottom-right', 'left-0 bottom-0 sm:ml-6 sm:mb-6': position=='bottom-left', 'left-1/2 -translate-x-1/2 bottom-0 sm:mb-6': position=='bottom-center' }"
          x-cloak
        >
          <template x-for="(toast, index) in toasts" x-bind:key="toast.id">
            <li
              x-bind:id="toast.id"
              x-data="{
                        toastHovered: false
                    }"
              x-init="
                        
                        if(position.includes('bottom')){
                            $el.firstElementChild.classList.add('toast-bottom');
                            $el.firstElementChild.classList.add('opacity-0', 'translate-y-full');
                        } else {
                            $el.firstElementChild.classList.add('opacity-0', '-translate-y-full');
                        }
                        setTimeout(function(){
                            
                            setTimeout(function(){
                                if(position.includes('bottom')){
                                    $el.firstElementChild.classList.remove('opacity-0', 'translate-y-full');
                                } else {
                                    $el.firstElementChild.classList.remove('opacity-0', '-translate-y-full');
                                }
                                $el.firstElementChild.classList.add('opacity-100', 'translate-y-0');

                                setTimeout(function(){
                                    stackToasts();
                                }, 10);
                            }, 5);
                        }, 50);
        
                        setTimeout(function(){
                            setTimeout(function(){
                                $el.firstElementChild.classList.remove('opacity-100');
                                $el.firstElementChild.classList.add('opacity-0');
                                if(toasts.length == 1){
                                    $el.firstElementChild.classList.remove('translate-y-0');
                                    $el.firstElementChild.classList.add('-translate-y-full');
                                }
                                setTimeout(function(){
                                    deleteToastWithId(toast.id)
                                }, 300);
                            }, 5);
                        }, 4000); 
                    "
              x-on:mouseover="toastHovered=true"
              x-on:mouseout="toastHovered=false"
              class="absolute w-full duration-300 ease-out select-none sm:max-w-xs"
              x-bind:class="{ 'toast-no-description': !toast.description }"
            >
              <span
                class="relative flex flex-col items-start shadow-[0_5px_15px_-3px_rgb(0_0_0_/_0.08)] w-full transition-all duration-300 ease-out  border  sm:rounded-md sm:max-w-xs group"
                x-bind:class={`{'p-4' : !toast.html, 'p-0' : toast.html, ${toastTypes
                  .map(
                    (variant: keyof typeof toastVariants.type) =>
                      ` '${toastVariants.type[variant].class}' : toast.type=='${variant}'`
                  )
                  .join(", ")}}`}
              >
                <template x-if="!toast.html">
                  <div class="relative">
                    <div class="flex items-center">
                      {toastTypes.map(
                        (variant: keyof typeof toastVariants.type) => {
                          const Icon = toastVariants.type[variant].Icon;
                          if (!Icon) return undefined;
                          return (
                            <Icon
                              className="size-[18px] mr-1.5 -ml-1 "
                              x-show={`toast.type=='${variant}'`}
                            />
                          );
                        }
                      )}
                      <p
                        class="text-[13px] font-medium leading-none text-gray-800"
                        x-text="toast.message"
                      ></p>
                    </div>
                    <p
                      x-show="toast.description"
                      x-bind:class="{ 'pl-5' : toast.type!='default' }"
                      class="mt-1.5 text-xs leading-none opacity-70"
                      x-text="toast.description"
                    ></p>
                  </div>
                </template>
                <template x-if="toast.html">
                  <div x-html="toast.html"></div>
                </template>
                <span
                  x-on:click="burnToast(toast.id)"
                  class="absolute right-0 p-1.5 mr-2.5 text-gray-400 duration-100 ease-in-out rounded-full opacity-0 cursor-pointer hover:bg-gray-50 hover:text-gray-500"
                  x-bind:class="{ 'top-1/2 -translate-y-1/2' : !toast.description && !toast.html, 'top-0 mt-2.5' : (toast.description || toast.html), 'opacity-100' : toastHovered, 'opacity-0' : !toastHovered }"
                >
                  <svg
                    class="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </span>
              </span>
            </li>
          </template>
        </ul>
      </template>
    </div>
  );
}
