"use client";

class NeuralAudio {
    private ctx: AudioContext | null = null;

    private getCtx() {
        if (!this.ctx && typeof window !== 'undefined') {
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return this.ctx;
    }

    public async playActivate() {
        const ctx = this.getCtx();
        if (!ctx) return;
        if (ctx.state === 'suspended') await ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.3);
    }

    public async playTransmit() {
        const ctx = this.getCtx();
        if (!ctx) return;
        if (ctx.state === 'suspended') await ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }

    public async playSync() {
        const ctx = this.getCtx();
        if (!ctx) return;
        if (ctx.state === 'suspended') await ctx.resume();

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(110, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(55, ctx.currentTime + 0.5);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    }
}

export const neuralAudio = new NeuralAudio();
