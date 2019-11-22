import { async, TestBed } from '@angular/core/testing';
import { AddgroupchatComponent } from './addgroupchat.component';
describe('AddgroupchatComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddgroupchatComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(AddgroupchatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=addgroupchat.component.spec.js.map