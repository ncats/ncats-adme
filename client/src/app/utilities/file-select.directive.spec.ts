import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FileSelectDirective } from './file-select.directive';
import { ElementRef } from '@angular/core';

describe('FileSelectDirective', () => {
  it('should create an instance', () => {
    const directive = new FileSelectDirective(new MockElementRef({}));
    expect(directive).toBeTruthy();
  });
});

export class MockElementRef extends ElementRef {}
