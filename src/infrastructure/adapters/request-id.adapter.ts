import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export default class RequestIdAdapter {
  id: string;
}
